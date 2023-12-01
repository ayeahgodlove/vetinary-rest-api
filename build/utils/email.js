"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordResetEmail = exports.sendRegistrationMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const logger_1 = require("../shared/helper/logger");
// Setup your nodemailer transporter
const transporter = nodemailer_1.default.createTransport({
    service: "Gmail",
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "ayeahgodlove5@gmail.com",
        pass: "tham kobd dsrt fvgi",
    },
});
const sendRegistrationMail = async (to, url) => {
    const mailOptions = {
        from: 'ayeahgodlove5@gmail.com',
        to: to,
        subject: "Welcome to LinkaVet App!",
        html: `
            <p> Thank you for registering on our app</>
            <span> Click on the link below to verify your account</span> 
            <a href=${url}">Verify</a> `,
    };
    return transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            return logger_1.logger.info(err);
        return logger_1.logger.info(info);
    });
};
exports.sendRegistrationMail = sendRegistrationMail;
const sendPasswordResetEmail = (to, resetLink) => {
    const mailOptions = {
        from: 'ayeahgodlove5@@gmail.com',
        to,
        subject: 'Password Reset',
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`, // Include the password reset link
    };
    return transporter.sendMail(mailOptions);
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
