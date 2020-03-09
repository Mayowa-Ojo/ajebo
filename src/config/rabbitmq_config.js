const amqp = require('amqplib/callback_api');

// check node env
if(process.env.NODE_ENV !== 'production') {
   require('dotenv');
}

// const { LOCALAMQP_URL: URI } = process.env;
const URI = process.env.CLOUDAMQP_URL != 'undefined' ? process.env.CLOUDAMQP_URL : process.env.LOCALAMQP_URL;

// connect to RabbitMQ
const connect_rmq = (callback) => {
   
   amqp.connect(URI, (err, connection) => {
      if(err) {
        return panic(err, connection);
      }
      if(process.env.NODE_ENV == 'test') {
         callback(connection);
         connection.close();
         return;
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