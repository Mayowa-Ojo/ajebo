const redis = require("redis");

const client = redis.createClient();

(function() {

   client.on("error", (err) => {
      console.error(`Error: ${err}`)
   });
   
   client.on("connect", () => {
      console.log("[x] --redis: server connected");
   });

})()

module.exports = client;

