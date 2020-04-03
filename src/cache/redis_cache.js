// redis cache - temporarily store scraped data from consumers
const util = require("util")
const client =  require('../config/redis_config');
// promisify methods
const asyncGet = util.promisify(client.get).bind(client);
const asyncSet = util.promisify(client.set).bind(client);
const asyncDel = util.promisify(client.del).bind(client);
const asyncIncrby = util.promisify(client.incrby).bind(client);


/**
 * store data in hash field
 */
const storeScrapeData = async function(data, key) {

   try {
      const reply = await asyncSet(key, JSON.stringify(data));

      // increment counter
      await incrementCounter();
      console.log(`[x] --redis: @storeScrapeData - ${reply}`);
   } catch(err) {
      console.error(err);
      return;
   }
}

const fetchScrapeData = async function() {
   const keys = [
      "sneakers",
      "anthem-jackets",
      "training-kits",
      "tracksuits"
   ];

   const data = {};

   // fetch data for all keys and aggregate
   for(let i = 0; i < keys.length; i++) {

      try {
         const reply = await asyncGet(keys[i]);

         data[keys[i]] = JSON.parse(reply);
      } catch(err) {
         console.error(err);
         return;
      }
   }

   return data;
}

const initializeCounter = async function() {

   try {
      const reply = await asyncSet("counter", 0);
      
      console.log(`@initializeCounter: ${reply}`);
   } catch(err) {
      console.error(err);
      return;
   }
}

const fetchCounter = async function() {

   try {
      const reply = await asyncGet("counter");

      return JSON.parse(reply);
   } catch(err) {
      console.error(err);
      return;
   }
}

/**
 * increments value at hash field. Initializes of doesn't exist
 */
const incrementCounter = async function() {

   try {
      const reply = await asyncIncrby("counter", 1);

      console.log(`[x] --redis: @incrementCounter - ${reply}`);
   } catch(err) {
      console.error(err);
      return;
   }
}

/**
 * checks the current counter state
 */
const checkCounter = async function(responseCallback) {

   try {
      const reply = await asyncGet("counter");

      return JSON.parse(reply) >= 3;
   } catch(err) {
      console.error(err);
      return;
   }
}

/**
 * cleanup cache after all consumers have executed
 */
const cleanUp = async function() {
   const keys = [
      "sneakers",
      "anthem-jackets",
      "training-kits",
      "tracksuits"
   ];

   for(let i = 0; i < keys.length; i++) {

      try {
         const reply = await asyncDel(keys[i]);

         console.log(`[x] --redis: @cleanUp - ${reply}`);
      } catch(err) {
         console.log(err);
         return;
      }
   }

      // reset counter
   try {
      const reply = await asyncSet("counter", 0);

      console.log(`[x] --redis @cleanUp [reset counter]: ${reply}`);
   } catch(err) {
      console.log(err);
      return;
   }
}

exports.incrementCounter = incrementCounter;
exports.storeScrapeData = storeScrapeData;
exports.fetchScrapeData = fetchScrapeData;
exports.cleanUp = cleanUp;
exports.checkCounter = checkCounter;
exports.fetchCounter = fetchCounter;
exports.initializeCounter = initializeCounter;

module.exports = exports;
