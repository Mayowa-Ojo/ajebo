const express = require('express');
const helmet = require('helmet');

// check Node env
if(process.env.NODE_ENV !== 'production') {
   require('dotenv').config();
}

const args = process.argv.slice(1);

const app = express();
// Globals
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

app.use(helmet());

if(args[1] == '--dev') {
   // connect to loacl database
   require('./config/database_config').connect('dev');
} else {
   // connect to cloud database
   require('./config/database_config').connect('prod');
   
   // connect to RabbitMQ and start consumer
   require('./workers/consumer');
   
   // start cron job
   require('./jobs/cron');
   
   // start wake-dyno cron
   require('./jobs/wake_dyno');
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
   res.send('Welcome to Ajebo 🤖️ - Bot Tracker for e-commerce')
});


app.listen(PORT, () => {
   console.log(`-- Server: listening in ${NODE_ENV} on port: ${PORT}`);
});
