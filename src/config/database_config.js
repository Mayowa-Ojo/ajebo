const mongoose = require('mongoose');
require('dotenv').config();

// globals
const DATABASE_URI = process.env.DATABASE_URI;

// setup mongoose connection

mongoose.connect(DATABASE_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true
})
   .then(() => console.log('connected to database'))
   .catch(err => console.error(err));