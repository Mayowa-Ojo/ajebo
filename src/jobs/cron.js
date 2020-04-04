const cron = require('cron');

// globals
const cronJob = new cron.CronJob('0 */10 * * * *', function() {
   // publish task to consumer every <x> hours/mins
   require("../workers/scraper/publisher")({ consumerType: "cron" })
}, null, true, 'America/Los_Angeles');

cronJob.start();
