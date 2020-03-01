const amqp = require('amqplib/callback_api');

// check node env
if(process.env.NODE_ENV !== 'production') {
   require('dotenv');
}

const { RABBITMQ_URL } = process.env;

// connect to RabbitMQ
const connect_rmq = (callback) => {
   
   amqp.connect(RABBITMQ_URL, (err, connection) => {
      if(err) {
        return panic(err, connection);
      }
      console.log('-- RabbitMQ: connected...');

      callback(connection);
   });
};

const panic = (err, connection) => {
   console.error(`-- RabbitMQ: Error occured - ${err.message}`);
   if(connection) {
      connection.close(() => process.exit(1));
   }

};

exports.connect_rmq = connect_rmq;
exports.panic = panic;

module.exports = exports;