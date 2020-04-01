// redis cache - temporarily store scraped data from consumers
const client =  require('../config/redis_config');

/**
 * store data in hash field
 */
exports.storeScrapeData = function(data, key) {
   client.set(key, JSON.stringify(data), (err, reply) => {
      if(err) {
         console.error(`Error: ${err}`);
         return;
      }
      
      // increment counter
      incrementCounter();
      console.log(`[x] --redis: @storeScrapeData - ${reply}`);

   });
}

exports.fetchScrapeData = function() {
   const keys = [
      "sneakers",
      "anthem-jackets",
      "training-kits",
      "tracksuits"
   ];

   const data = {};

   // fetch data for all keys and aggregate
   for(let i = 0; i < keys.length; i++) {

      client.get(keys[i], (err, reply) => {
         if(err) {
            console.error(`Error: ${err}`);
            return;
         }

         data[keys[i]] = JSON.parse(reply);
      })
   }

   return data;
}

/**
 * increments value at hash field. Initializes of doesn't exist
 */
exports.incrementCounter = function() {
   client.hincrby("counter", "count", 1, (err, reply) => {
      if(err) {
         console.error(`Error: ${err}`);
         return;
      }

      console.log(`[x] --redis: @incrementCounter - ${reply}`);
   });
}

/**
 * checks the current counter state
 */
exports.checkCounter  = function() {
   return client.hget("counter", "count", (err, reply) => {
      if(err) {
         console.error(`Error: ${err}`);
         return;
      }

      return JSON.parse(reply) >= 3;
   });
}

/**
 * cleanup cache after all consumers have executed
 */
exports.cleanUp = function() {
   const keys = [
      "sneakers",
      "anthem-jackets",
      "training-kits",
      "tracksuits"
   ];

   for(let i = 0; i < keys.length; i++) {

      client.del(keys[i], (err, reply) => {
         if(err) {
            console.error(`Error: ${err}`);
            return;
         }
         
         console.log(`[x] --redis: @cleanUp - ${reply}`);
      });
   }

   client.hdel("counter", "count", (err, reply) => {
      if(err) {
         console.error(`Error: ${err}`);
         return;
      }

      console.log(`[x] --redis: @cleanUp - ${reply}`);
   });
}
