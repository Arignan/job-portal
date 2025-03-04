//Email notification functions

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Adjust service as needed
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendNotification = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    });
    console.log('Email sent successfully');
  } catch (err) {
    console.error('Error sending email:', err);
  }
};
