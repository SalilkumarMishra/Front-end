const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || "587", 10),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendResetEmail = async (to, resetUrl) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Password reset",
    html: `<p>You requested a password reset. Click here: <a href="${resetUrl}">${resetUrl}</a></p>`,
  });
  return info;
};
