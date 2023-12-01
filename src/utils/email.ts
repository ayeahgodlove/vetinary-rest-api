import nodemailer from "nodemailer";
import { logger } from "../shared/helper/logger";

// Setup your nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email service
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ayeahgodlove5@gmail.com",
    pass: "tham kobd dsrt fvgi",
  },
});

export const sendRegistrationMail = async (to: string, url: string) => {
  const mailOptions = {
    from: 'ayeahgodlove5@gmail.com',
    to: to,
    subject: "Welcome to LinkaVet App!",
    html: `
            <p> Thank you for registering on our app</>
            <span> Click on the link below to verify your account</span> 
            <a href=${url}">Verify</a> `,
  };

  return transporter.sendMail(mailOptions, function (err, info ) {
    if (err) return logger.info(err);
    return logger.info(info);
  });
};

export const sendPasswordResetEmail = (to: string, resetLink: string) => {
    const mailOptions = {
      from: 'ayeahgodlove5@@gmail.com',
      to,
      subject: 'Password Reset',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`, // Include the password reset link
    };
  
    return transporter.sendMail(mailOptions);
  };
