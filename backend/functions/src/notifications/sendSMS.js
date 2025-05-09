
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.pass,
  },
});

exports.sendEmail = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated.');
  }

  const { to, subject, text } = data;
  const mailOptions = {
    from: functions.config().email.user,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
  return { success: true };
});