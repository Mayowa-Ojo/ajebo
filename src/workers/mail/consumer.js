const { connect_rmq, panic } = require('../../config/rabbitmq_config');
// const runCron = require('../jobs/cron');
const { fetchScrapeData, cleanUp } = require("../../cache/redis_cache");
const { sendMail } = require("../../utils/mail");
// connect to RabbitMQ server
connect_rmq(connection => {

   // send mail when consumer receives message {mail}
   connection.createChannel((err, channel) => {

      if(err) {
         return panic(err, connection);
      }

      const queue = 'mail';

      channel.assertQueue(queue, { durable: true });

      console.log(`-- RabbitMQ: waiting for queue, ${queue}: To exit press CTRL+C`);

      channel.consume(queue, (message) => {

         // check type of message sent
         if(message.content.toString() == 'mail') {
            // fetch and aggregate data from redis cache
            const data = fetchScrapeData();
            // call sendMail function
            sendMail(data);
            // run clean up
            cleanUp();
         }

      }, { noAck: false });

   });

});