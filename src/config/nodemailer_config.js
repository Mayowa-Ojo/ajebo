// configuration message

// globals

exports.smtpConfig = function(host, port, {user, pass}, debug, logger) {
   return {
      host,
      port,
      auth: {
         user,
         pass
      },
      debug,
      logger
   }
};

module.exports = exports;
