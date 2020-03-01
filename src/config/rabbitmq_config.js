const amqp = require('amqplib/callback_api')

// check node env
if(process.env.NODE_ENV !== 'production') {
   require('dotenv')
}

const { RABBITMQ_URL } = process.env;

// connect to RabbitMQ
const connect_rmq = () => {
   
   return amqp.connect(RABBITMQ_URL, (err, connection) => {
      if(err) {
         console.error(`-- RabbitMQ: Error establishing connection: ${err.message} \n-- Retrying in 5s...`);
         setTimeout(() => {
            console.log('-- RabbitMQ: Retrying...')
            connect_rmq();
         }, 10000);
         return;
      }
      console.log('-- RabbitMQ: connected...');
      return connection;
   });
};

module.exports = connect_rmq;