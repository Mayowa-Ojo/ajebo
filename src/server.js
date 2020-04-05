const express = require('express');
const helmet = require('helmet');
const { initializeCounter } = require('./cache/redis_cache');

// check Node env
if(process.env.NODE_ENV !== 'production') {
   require('dotenv').config();
}

const args = process.argv.slice(2);

const app = express();
// Globals
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

app.use(helmet());

if(args[0] == '--dev') {
   // connect to loacl database
   require('./config/database_config').connect('dev');
} else if(NODE_ENV == 'test') {
   // connect to test database
   require('./config/database_config').connect('test');
} else {
   // connect to cloud database
   require('./config/database_config').connect('prod');
   
   // connect to RabbitMQ and start consumer
   require('./utils/execute_consumers');

   // connect to redis
   require('./config/redis_config');

   // start cron job
   require('./jobs/cron');
   
   // start wake-dyno cron
   require('./jobs/wake_dyno');

   // set counter variable
   initializeCounter();
}

app.get('/scrape', (_req, res) => {
   // get live data
   require('./utils/scraper').scrapeURL()
      .then(data => res.json(data))
      .catch(err => {
         console.error(`Error occured: ${err.message}`)
         res.redirect('/')
      });

   // -------------------------------------------------
   // handling this route with a barebones http request bring about some inefficiency
   // one solution is to use workers, but there are some caveats:
   
   // send message to consumer
   // TODO: figure out how to respond with returned data
      // - potential solution - use sockets to listen for events
   // require('./workers/publisher')({ consumerType: 'request', res });
});

app.get('/', (req, res) => {
   res.send('Welcome to Ajebo 🤖️ - Bot Tracker for e-commerce');
});

// start server only outside test env
if(NODE_ENV !== 'test') {

   app.listen(PORT, () => {
      console.log(`-- Server: listening in ${NODE_ENV} on port: ${PORT}`);
   });
}

module.exports = app;