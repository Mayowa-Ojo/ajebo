const { connect_rmq, panic } = require('../config/rabbitmq_config');

// connect to RabbitMQ server
connect_rmq(connection => {
   
   // create consumer channel
   connection.createChannel((err, channel) => {
      if(err) {
         return panic(err, connection);
      }
      
      const queue = 'cron';
      const content = 'get scrape data from url';
      
      channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(queue, new Buffer.from(content), { persistent: true});
      console.log(`-- RabbitMQ: [x] - message sent to queue: ${queue}`);

      channel.close(() => connection.close());
   });
});