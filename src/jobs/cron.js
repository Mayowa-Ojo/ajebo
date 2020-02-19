const cron = require('cron');

// globals
const cronJob = new cron.CronJob('* * * * * *', function() {
   console.log('Hello world...');
}, null, true, 'America/Los_Angeles');

cronJob.start();
