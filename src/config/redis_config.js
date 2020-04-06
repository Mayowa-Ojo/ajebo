const redis = require("redis");

let client;
// check Node env
if(process.env.NODE_ENV == 'production') {

   client = redis.createClient(process.env.REDIS_URL);
   
} else {

   client = redis.createClient();
}

(function() {

   client.on("error", (err) => {
      console.error(`Error: ${err}`)
   });
   
   client.on("connect", () => {
      console.log("[x] --redis: server connected");
   });

})()

module.exports = client;

