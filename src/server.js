const express = require('express');
const helmet = require('helmet');

// check Node env
if(process.env.NODE_ENV !== 'production') {
   require('dotenv').config();
}

const app = express();
// Globals
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

app.use(helmet());

require('./config/database_config');
// connect to RabbitMQ and start consumer
require('./workers/consumer');
// start cron job
require('./jobs/cron');

app.get('/scrape', (_req, res) => {
   // send message to consumer
   // TODO: figure out how to respond with returned data
      // - potential solution - use sockets to listen for events
   require('./workers/publisher')({ consumerType: 'request', res });
})

app.get('/', (req, res) => {
   res.send('Welcome to Ajebo - Bot Tracker for e-commerce')
});


app.listen(PORT, () => {
   console.log(`-- Server: listening in ${NODE_ENV} on port: ${PORT}`);
});
