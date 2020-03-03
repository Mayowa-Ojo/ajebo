/**
 * Heroku dynos go to sleep after 30 mins of inactivity. This obstructs the smooth running of the cron job
 */

const cron = require('cron');
const fetch = require('node-fetch');

(() => {
   const cronJob = new cron.CronJob('0 */25 * * * *', function() {
      fetch('https://ajebo.herokuapp.com/')
         .then(res => console.log(`response - ${res.ok}, status - ${res.status}`))
         .catch(err => console.error(err.message));
   });

   // start cron-job
   cronJob.start();
})();