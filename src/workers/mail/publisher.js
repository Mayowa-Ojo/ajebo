const { connect_rmq, panic } = require("../../config/rabbitmq_config");

// connect to RabbitMQ server
module.exports = (function({ consumerType }) {

   connect_rmq(connection => {
      
      // create consumer channel
      connection.createChannel((err, channel) => {
         if(err) {
            return panic(err, connection);
         }
         
         let content;

         if(consumerType == 'mail') {
            content = 'mail';
         }
         
         const queue = 'mail';
         
         channel.assertQueue(queue, { durable: true });
         channel.sendToQueue(queue, new Buffer.from(content), { persistent: true});
         console.log(`-- RabbitMQ: [x] - message sent to queue: ${queue}`);
         
         channel.close(() => connection.close());
      });
   });
});