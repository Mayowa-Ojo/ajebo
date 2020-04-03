const { connect_rmq, panic } = require('../../config/rabbitmq_config');
// const runCron = require('../jobs/cron');
const { distribute } = require("../../utils/orchestrate_consumers");
const { storeScrapeData, checkCounter, fetchCounter } = require("../../cache/redis_cache")

// connect to RabbitMQ server
connect_rmq(connection => {

   // create 2 consumer channels
   for(let i = 0; i < 2; i++) {

      connection.createChannel((err, channel) => {

         if(err) {
            return panic(err, connection);
         }

         const queue = 'cron';

         channel.assertQueue(queue, { durable: true });

         console.log(`-- RabbitMQ: consumer-${i} - waiting for queue, ${queue}: To exit press CTRL+C`);

         channel.consume(queue, async (message) => {

            // check type of message sent
            if(message.content.toString() == 'cron') {
               // fetch data changes and store in cache
               //initialize counter
               const currIndex = await fetchCounter();
               // index = val
               console.log(`@distribute: currIndex=${currIndex}`)
               distribute(currIndex)
                  .then(async ([res, category]) => {
                     // check cache limit
                     const limit = await checkCounter();

                     if(limit) {
                        // store final batch
                        storeScrapeData(res, category);
                        // publish to email queue
                        require("../mail/publisher")({ consumerType: "mail" });

                        channel.ack(message);
                        console.log(`-- RabbitMQ: process executed in ${queue} - message: ${message.content.toString()}`);
                        return;
                     }

                     storeScrapeData(res, category);
                     
                     channel.ack(message);
                     console.log(`-- RabbitMQ: process executed in ${queue} - message: ${message.content.toString()}`);
                     
                     // publish to next consumer
                     require("./publisher")({ consumerType: "cron" })

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