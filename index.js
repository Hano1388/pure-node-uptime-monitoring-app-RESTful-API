/*
 * Main API file
 *
 */

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
// require config file
const config = require('./config');

// Create http server
const server = http.createServer(function (req, res) {
    // Parse URL
    const parsedUrl = url.parse(req.url, true);
    // Get Path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    // Getting request method
    const method = req.method.toLowerCase();
    // Getting queryStringObject
    const queryStringObject = parsedUrl.query;
    // Get headers
    const headers = req.headers;
    // Get the payload
    const decoder = new StringDecoder();
    let buffer = '';

    req.on('data', function(data) {
      buffer += decoder.write(data);
    });

    req.on('end', function() {

      buffer = decoder.end();

      // spicify the requested resource
      const handlerPath = router.hasOwnProperty(trimmedPath) ? router[trimmedPath] : handlers.notFound;

      // Construct data object to send to handler
      const data = {
        headers,
        method,
        queryStringObject,
        trimmedPath,
        'payload': buffer
      }

      // route the request to the handler
      handlerPath(data, function(statusCode = 200, payload) {
        // set default default payload
        payload = typeof(payload) == 'object' ? payload : {};
        const payloadString = JSON.stringify(payload);

        // Response
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(payloadString);
        // info log
        console.info(`
          Request received on path: ${trimmedPath}\n
          The method is ${method}\n
          The payload is: ${buffer}\n
          Query String Object: %j\n
          Headers: %j\n
          Returned payload: ${payloadString}\n
          `, queryStringObject, headers);
      });
    });
});

// Start server on port 3000
server.listen(config.port, function () {
    console.log(`Server is listening on port: ${config.port} in ${config.stage} mode`);
});

// define handlers
const handlers = {};

// define test handler
handlers.test = function(data, callback) {
  // callback with statusCode and payload
  callback(405, { 'name': 'Test Handler' });
};

// define 404 notFound handler
handlers.notFound = function(data, callback) {
  callback(404, { 'message': 'Resource Not Found!' });
};

// Define router
const router = {
  'test' : handlers.test
}
