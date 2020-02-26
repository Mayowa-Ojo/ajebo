const mongoose = require('mongoose');
require('dotenv').config();

// globals
const { 
   DATABASE_LOCAL_URI,
   DATABASE_USER,
   DATABASE_PASS
 } = process.env;
const URI = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASS}@ajebo-0-nuq67.mongodb.net/ajebo?retryWrites=true&w=majority`;

// setup mongoose connection
mongoose.connect(URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true
})
   .then(() => console.log('connected to database'))
   .catch(err => console.error(err));