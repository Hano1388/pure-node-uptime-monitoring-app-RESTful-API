/*
*
* Routes
*
*/

// Dependencies

// define handlers
const handlers = {};

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
