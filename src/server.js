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
require('./jobs/cron');

app.get('/scrape', (req, res) => {

   require('./utils/scraper').scrapeURL()
      .then(data => res.json(data))
      .catch(err => res.status(400).json({message: err.message}));
})

app.get('/', (req, res) => {
   res.send('Welcome to Ajebo - Bot Tracker for e-commerce')
});


app.listen(PORT, () => {
   console.log(`server started in ${NODE_ENV} on port: ${PORT}`);
});