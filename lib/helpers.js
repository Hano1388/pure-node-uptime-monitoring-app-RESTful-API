/*
*
* Helper functions
*
*/

// Dependencies
const crypto = require('crypto');
const config = require('./config');

// Container for helpers
const helpers = {};

// Create a sha256 hash
helpers.hash = (password) => {
  if(typeof(password) == 'string' && password.length > 0) {
    const hashedPassword = crypto.createHmac('sha256', config.hashingSecret)
                                 .update(password)
                                 .digest('hex');
    return hashedPassword;

  } else {
    return false;
  }
};

// Parse a JSON tring to an object, without throwing error
helpers.parseJsonToObject = (str) => {
  try {
    const obj = JSON.parse(str);
    return obj;
  } catch (err) {
    return {};
  }
};

// Export helper container
module.exports = helpers;
