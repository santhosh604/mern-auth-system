
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: "a59ff5001@smtp-brevo.com",
        pass: process.env.SMTP_PASS
    }
})

export default transporter;