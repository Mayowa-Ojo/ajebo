const { connect_rmq, panic } = require('../config/rabbitmq_config')

// connect to RabbitMQ server
connect_rmq(connection => {
   
   // create consumer channel
   connection.createChannel((err, channel) => {
      if(err) {
         return panic(err, connection);
      }
      
      const queue = 'cron';
      
      channel.assertQueue(queue, { durable: true });
      
      console.log(`-- RabbitMQ: waiting for queue, ${queue}: To exit press CTRL+C`);
      
      channel.consume(queue, (message) => {
         
         require('../utils/scraper').scrapeURL()
            .then(data => {
               console.log(data)
               console.log(`-- RabbitMQ: process executed in ${queue} - message: ${message.content.toString()}`);
               // acknowledge message
               channel.ack(message);
            })
            .catch(err => console.error(err.message));
      }, { noAck: false });
      
   });
});