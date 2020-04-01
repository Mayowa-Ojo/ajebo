const { connect_rmq, panic } = require('../config/rabbitmq_config');
const runCron = require('../jobs/cron');
const { storeScrapeData } = require("../cache/redis_cache")

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
               runCron()
               .then(_ => {
                  console.log(`-- RabbitMQ: process executed in ${queue} - message: ${message.content.toString()}`);
                  channel.ack(message);
               })
               .catch(err => console.error(err));
            }

         }, { noAck: false });

      });

   }
});