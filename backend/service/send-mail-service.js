import nodemailer from "nodemailer";

console.log("---process.env.EMAIL_USERprocess.env.EMAIL_USER", process.env.EMAIL_USER)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kartikrastogi4544@gmail.com",
    pass: "wztfrihnnevwisbs",
  },
});

export const sendOTP = async (to, otp) => {
  try {
    const mailOptions = {
      from: "kartikrastogi4544@gmail.com",
      to,
      subject: "Library Management - OTP Verification",
      html: `
        <div style="font-family:sans-serif;padding:20px;border:1px solid #ddd;border-radius:10px;">
          <h2 style="color:#e63946;">Library Management System</h2>
          <p>Dear user,</p>
          <p>Your One Time Password (OTP) for signup verification is:</p>
          <h1 style="letter-spacing:5px;">${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
          <p>Regards,<br/>Library Management Team 📚</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};
