import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.json({success: false, message: "NO token"})
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(tokenDecode.id)
        
        if (!user) {
            res.json({success: false, message: "Unathourized user!"})
            console.log("failed")
        }

        req.user = user;

        next();

    }
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

export default protect;