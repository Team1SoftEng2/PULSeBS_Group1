/* eslint-disable max-len */
const nodemailer = require('nodemailer');
const {sendEmail} = require('../../controllers/Email');


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
