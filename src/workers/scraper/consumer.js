const { connect_rmq, panic } = require('../../config/rabbitmq_config');
// const runCron = require('../jobs/cron');
const { distribute } = require("../../utils/orchestrate_consumers");
const { storeScrapeData, checkCounter } = require("../../cache/redis_cache")

// connect to RabbitMQ server
connect_rmq(connection => {

   // spin up multiple consumers
   // create 4 consumer channels
   for(let i = 0; i < 4; i++) {

      connection.createChannel((err, channel) => {

         if(err) {
            return panic(err, connection);
         }

         const queue = 'cron';

         channel.assertQueue(queue, { durable: true });

         console.log(`-- RabbitMQ: waiting for queue, ${queue}: To exit press CTRL+C`);

         channel.consume(queue, (message) => {

            // check type of message sent
            if(message.content.toString() == 'cron') {
               // fetch data changes and store in cache
               distribute(i)
                  .then(([res, category]) => {
                     // check cache limit
                     if(checkCounter()) {
                        // store final batch
                        storeScrapeData(res, category);
                        // publish to email queue
                        require("../mail/publisher")({ consumerType: "mail" });
                        return;
                     }

                     storeScrapeData(res, category);
                     return;
                  })
                  .catch(err => {
                     console.error(err);
                     return;
                  });
            }

         }, { noAck: false });

      });

   }
});