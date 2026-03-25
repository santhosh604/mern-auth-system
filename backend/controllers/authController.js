import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import transporter from "../config/nodemailer.js";

export const register = async (req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        res.json({success: false, message: "credentials are required"})
    }
    
    try {
        const existUser = await userModel.findOne({email});

        if (existUser) {
            return res.json({success: false, message: "User already existed"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({name, email, password: hashedPassword});
        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        const mailOptions = {
            from: process.env.MAIL_SENDER,
            to: email,
            subject: "Successfully Logged!",
            text: `Hello ${name}! you have logged successfully!`
        };

        await transporter.sendMail(mailOptions);

        res.json({success: true, message: "Registered Successful!"});

    } catch (error) {
        res.json({success: false, message: error.message});
    }

}

export const login = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.json({success: false, message: "credentials are required"});
    }

    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success: false, message: "User not existed"});
        }

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.json({success: false, message: "Password Incorrect!"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 * 7
        })

        res.json({success: true, message: "Login Successful!"});


    }
    catch (error) {
        res.json({success: false, message: error.message});
    }

}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
        return res.json({success: true, message: "User Logout succefully!"})

    }
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const sendOtp = async (req, res) => {
    const {email} = req.body;
    if (!email) {
        return res.json({success: false, message: "Email is required!"});
    }
    
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success: false, message: "Email is not regestered!"});
        }

        const otp = crypto.randomInt(100000, 900000);
        
        const mailOptions = {
            from: process.env.MAIL_SENDER,
            to: email,
            subject: "Your reset-OTP",
            text: `your OTP is ${otp}`
        };

        await transporter.sendMail(mailOptions);
        user.resetOtp = otp;
        await user.save();
        res.json({success: true, message: `Successfully sent OTP to your Email ${otp}`});


    }
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const verifyOtp = async (req, res) => {
    const {email, otp} = req.body;
    if (!email || !otp) {
        res.json({success: false, message: "invalid values"});
    }
    try {
        const user = await userModel.findOne({email});
        if (otp === user.resetOtp) {
            return res.json({success: true, message: "OTP is matched!"})
        }
        res.json({success: false, message: "Incorrect OTP!"})
    }
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const newPassword = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success: false, message: "Email is required!"});
        }
        const hash = await bcrypt.hash(password, 10);
        user.password = hash;
        user.resetOtp = "";
        await user.save();
        res.json({success: true, message: "Password reset successfull!"})
    }
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const profile = async (req, res) => {
  try {
    if (!req.user) {console
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};