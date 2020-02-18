const express = require('express')
require('dotenv').config()

const app = express()
// Globals
const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV

require('./utils/scraper')

app.get('/', (req, res) => {
   res.json({
      name: 'John Doe',
      age: 34,
      occupation: 'UI desginer',
      gender: 'M'
   })
})


app.listen(PORT, () => {
   console.log(`server started in ${NODE_ENV} on port: ${PORT}`)
})