// handle email functionality
const nodemailer = require('nodemailer');
const config = require('../config/nodemailer_config');
require('dotenv').config();

// globals
const SMTP_HOST=process.env.SMTP_HOST_TEST;
const SMTP_USER=process.env.SMTP_USER_TEST;
const SMTP_PASS=process.env.SMTP_PASS_TEST;
const SMTP_PORT=process.env.SMTP_PORT;
// const SMTP_DEBUG=process.env.SMTP_DEBUG;
// const SMTP_LOGGER=process.env.SMTP_LOGGER;

const sampleMessage = {
   from: '"Ajebo Tracker[bot]" <mayowaojo.e@gmail.com>',
   to: '"Mayowa Ojo" <ojomayowa.e@gmail.com>',
   subject: 'Test',
   text: 'Nodemailer is unicode friendly ✔'
};

const transporter = nodemailer.createTransport(config.smtpConfig(
   SMTP_HOST,
   SMTP_PORT,
   {user: SMTP_USER, pass: SMTP_PASS},
));


transporter.verify((err, success) => {
   if(err) throw new Error(err);

   console.log('server ready for messages...');
});

exports.sendMail = function({from, to, subject, text, html}) {
   const message = {from, to, subject, text, html}
   transporter.sendMail(message, (err, info) => {
      if(err) {
         console.log(`Oops! something went wrong: ${err.message}`);
         return;
      }
      
      console.log("Message sent %s: ", info.messageId);
      console.log("Preview URL %s: ", nodemailer.getTestMessageUrl(info));

      return;
   });
}

module.exports = exports;