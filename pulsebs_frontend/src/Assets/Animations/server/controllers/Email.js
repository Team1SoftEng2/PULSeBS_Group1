// Use at least Nodemailer v4.1.0
const nodemailer = require('nodemailer');
const BookingsService = require("../service/BookingsService");
const AuthenticationService = require("../service/AuthenticationService");
/*
// MESSAGE OBJECT TEMPLATE
const message = {
  from: '',
  to: '',
  subject: '',
  text: '',
  html: '',
};

To read messages sent --> go to https://ethereal.email/login
and log using the credential below
*/

async function sendEmail(message) {
  if (
    message.hasOwnProperty('from') &&
    message.hasOwnProperty('to') &&
    message.hasOwnProperty('subject') &&
    message.hasOwnProperty('text') &&
    message.hasOwnProperty('html')
  ) {
    const credential = {
      user: 'keyshawn.borer47@ethereal.email',
      pass: '3ZqrBgtwNcKgk85VGW',
    };

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: credential.user,
        pass: credential.pass,
      },
    });
    return new Promise((resolve, reject) => {
      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log('Error occurred. ' + err.message);
          reject(err);
        } else {
          /*
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          */
          resolve(info);
        }
      });
    });
  } else {
    return Promise.reject('message incorrect');
  }
}

async function sendEmailByUserId(userId, message) {
  const user = await AuthenticationService.getUserById(userId);

  await sendEmail({
    from: 'keyshawn.borer47@ethereal.email',
    to: user.email,
    subject: message.subject,
    text: message.text,
    html: message.html
  });
}

async function sendEmailByLectureId(lectureId, message) {
  const bookings = await BookingsService.getBookings(lectureId);
  for (const booking of bookings) {
    await sendEmailByUserId(booking.studentId, message);
  }
}

module.exports = {
  sendEmail,
  sendEmailByUserId,
  sendEmailByLectureId
}