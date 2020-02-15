const request = require('request')
const rpn = require('request-promise-native')
const cheerio = require('cheerio')

const { log } = console
const URL = 'https://google.com'

rpn(URL)
   .then(html => {
      log(html)
   })
   .catch(err => {
      log(err)
   })
