// handle email functionality
const nodemailer = require('nodemailer');
const config = require('../config/nodemailer_config');
const { generateHtml } = require('../utils/utils');

// check node env
if(process.env.NODE_ENV !== 'production') {
   require('dotenv').config();
}

// globals
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_PORT = process.env.SMTP_PORT;
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

   console.log('-- Nodemailer: listening for for messages...');
});

exports.sendMail = function(data) {
   const rawHtml = (category) => {
      return `
      <h3>New Update from Ajebo Tracker 🤖️</h3>
      *
      <p>Hi Mayowa, I found some changes in ${category} sizes since last update. Details below</p>
      *
      <table style="width:45em; border:1px solid #333;">
      *
      <tr style="border:1px solid #333;">
         <th style="border:1px solid #333; text-align:center">i</th>
         <th style="border:1px solid #333; text-align:center" colspan="3">storage data</th>
         <th style="border:1px solid #333; text-align:center" colspan="3">live data</th>
      </tr>
      *
      <tr style="border:1px solid #333;">
         <td style="border:1px solid #333;"></td>
         <td style="border:1px solid #333; text-align:center">name</td>
         <td style="border:1px solid #333; text-align:center">sizes</td>
         <td style="border:1px solid #333; text-align:center">product-id</td>
         
         <td style="border:1px solid #333; text-align:center">name</td>
         <td style="border:1px solid #333; text-align:center">sizes</td>
         <td style="border:1px solid #333; text-align:center">product-id</td>
      </tr>
      *
      </table>
      `;
   };

   const categories = [
      "sneakers",
      "anthem-jackets",
      "training-kits",
      "tracksuits"
   ];

   let html = "";

   // build html
   for(let i = 0; i < categories.length; i++) {

      html += generateHtml`${data[categories[i]]} ${rawHtml(categories[i])}`;

   }

   const message = {
      from: '"Ajebo Tracker[bot]" <mayowaojo.e@gmail.com>',
      to: '"Mayowa Ojo" <ojomayowa.e@gmail.com>',
      subject: 'Notifier: I found changes',
      text: `Placeholder text - error occured generating html`,
      html
   };

   // send email if check diff function returns changes
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