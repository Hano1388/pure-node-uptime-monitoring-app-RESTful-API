/*
*
* Routes
*
*/

// Dependencies
const _data = require('./data');
const helpers = require('./helpers');

// define handlers
const handlers = {};

// Users
handlers.users = (data, callback) => {
  const supportedMethods = ['get', 'post', 'put', 'delete'];
  if(supportedMethods.indexOf(data.method.toLowerCase()) > -1) {
    handlers._users[data.method](data, callback);
  } else {
    callback(405); // method not allowed statusCode
  }
};

// Container for users supported methods
handlers._users = {};

// Users - get
handlers._users.get = (data, callback) => {

};

// Users - post
// NOTE: Required data: firstName, lastName, phone, password, agreement
// Optional data: none
handlers._users.post = (data, callback) => {
  // Check all required fields are given and validate them
  // const { firstName, lastName, phone, password, agreedToTerms } = data.payload;

  const firstName = typeof(data.payload.firstName) == 'string'
                    && data.payload.firstName.trim().length > 0 ?
                    data.payload.firstName.trim() : false;
  const lastName = typeof(data.payload.lastName) == 'string'
                    && data.payload.lastName.trim().length > 0 ?
                    data.payload.lastName.trim() : false;
  const password = typeof(data.payload.password) == 'string'
                    && data.payload.password.trim().length > 0 ?
                    data.payload.password : false;
  const phone = typeof(data.payload.phone) == 'string'
                && data.payload.phone.trim().length == 10 ?
                data.payload.phone : false;
  const agreedToTerms = ['true', 'false', true, false].includes(data.payload.agreedToTerms)
                    && data.payload.agreedToTerms == true ?
                    true : false;
  if(firstName && lastName && phone && password && agreedToTerms) {
    // make sure that the user doesn't exist
    // for that, we need to read from user sub directory and make sure that user doesn't exist
    _data.read('users', phone, (err, data) => {
      if(err) { // if we get back an error, that means the user doesn't exist
        // Start creating new user
        // 1. hash the password
        const hashedPassword = helpers.hash(password); // we are going to create a helper to hash passwords

        // 2. create user object 
        if(hashedPassword) {
          // create the user object
          const userObject = {
            firstName,
            lastName,
            phone,
            hashedPassword,
            agreedToTerms
          };

          // Store the user
          _data.create('users', phone, userObject, (err) => {
            if(!err) {
              callback(200);
            } else {
              console.error(err);
              callback(500, { "error": "could not create the new user" });
            };
          });
        } else {
          callback(500, { "error": "could not hash the password" });
        }
      } else {
        // User with that phone number already exist
        callback(400, { "error": "A user with that phone number is already exist" });
      }
    });
  } else {
    callback(400, { "error": "Missing required field " });
  }
};

// Users - put
handlers._users.put = (data, callback) => {

};

// Users - delete
handlers._users.delete = (data, callback) => {

};
// define ping route
handlers.ping = (data, callback) => {
  callback(200);
}

// define 404 notFound handler
handlers.notFound = (data, callback) => {
  callback(404, { 'message': 'Resource Not Found!' });
};

// Export module
module.exports = handlers;
