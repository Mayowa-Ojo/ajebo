const express = require('express')

const app = express()


require('./src/scraper')

app.get('/', (req, res) => {
   res.json({
      name: 'John Doe',
      age: 34,
      occupation: 'UI desginer',
      gender: 'M'
   })
})


app.listen(7474, () => {
   console.log('server started on port: 7474')
})