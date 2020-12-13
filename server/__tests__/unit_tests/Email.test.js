/* eslint-disable max-len */
const nodemailer = require('nodemailer');
const {sendEmail, sendEmailByLectureId, sendEmailByUserId} = require('../../controllers/Email');

jest.mock('nodemailer');

nodemailer.createTransport.mockImplementation(() => {
  return {
    sendMail: jest.fn((message, cb) => {
      cb(null, {});
    })
  }
})

test('sending email', () => {
  const message = {
    from: '<test@example.com>',
    to: '<gabrielefantini97@gmail.com>',
    subject: 'Nodemailer is unicode friendly ✔',
    text: 'Provaaaaaaaaaaaaaaaaaaa',
    html: '<p><b>Hello</b> to myself!</p>',
  };
  return sendEmail(message).then( (data) => {
    expect(data).toBeDefined();
  });
});

test('sending email with wrong message obj', () => {
  const message = {
    from: '<test@example.com>',
  };
  return sendEmail(message)
      .then()
      .catch((data) => expect(data).toBe('message incorrect'));
});


const BookingsService = require('../../service/BookingsService');
jest.mock('../../service/BookingsService');

const bookings = [
  {studentId: 's27001', lectureId: 'CA3002'},
  {studentId: 's27002', lectureId: 'CA3002'},
  {studentId: 's27003', lectureId: 'CA3001'},
];

test('sending email by Lecture Id', () => {

  BookingsService.getBookings.mockImplementation((lectureId) => {
    return Promise.resolve(bookings.filter((booking) => booking.lectureId === lectureId));
  });

  return sendEmailByLectureId("CA3002", {
    subject: 'Nodemailer is unicode friendly ✔',
    text: 'Provaaaaaaaaaaaaaaaaaaa',
    html: '<p><b>Hello</b> to myself!</p>',
  });
});