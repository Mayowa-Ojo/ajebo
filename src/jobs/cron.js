const cron = require('cron');
const { sendMail } = require('../utils/mail');
const { checkDiff } = require('../utils/check_diff');
const { generateHtml } = require('../utils/utils');

// globals
const cronJob = new cron.CronJob('0 */2 * * * *', function() {
   // publish task to consumer every <x> hours/mins
   require('../workers/publisher');
}, null, true, 'America/Los_Angeles');

cronJob.start();

module.exports = runCron = () => {
   const rawHtml = `
   <h3>New Update from Ajebo Tracker 🤖️</h3>
   *
   <p>Hi Mayowa, I found some changes in sneaker sizes since last update. Details below</p>
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

   return Promise.resolve(
      checkDiff().then(res => {
         // generate dynamic html using tagged templates
         const html = generateHtml`${res} ${rawHtml}`;
         const message = {
            from: '"Ajebo Tracker[bot]" <mayowaojo.e@gmail.com>',
            to: '"Mayowa Ojo" <ojomayowa.e@gmail.com>',
            subject: 'Notifier: I found changes',
            text: `Placeholder text - error occured generating html`,
            html
         };
         // console.log(res.length)
         if(res.length > 0) {
            // send email if check diff function returns changes
            sendMail(message);
            return;
         } return;
      })
      .catch(err => console.error(err))
   )

};
