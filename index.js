/*
 * Main API file
 *
 */

// Dependencies
const http = require('http');
const https = require('https');
const fs = require('fs');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
// require config file
const config = require('./config');
const _data = require('./lib/data');

// write data to a file
// @TODO delete this
/*
_data.create('test', 'newFile', { "message": "Hello World!" }, function(err) {
  console.error(err);
});
*/

// read data from a file
// @TODO delete this
/*
_data.read('test', 'newFile', function(err, data) {
  if (err) {
    console.error('Error: ', err);
  }
  console.log('data: ', data);
});
*/

// Updating a file
_data.update('test', 'newFile', { "color": "Grey", "id": "!h7#8*93jsdfj^$" }, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Successfully updated newFile');
  };
});

// Create http server
const httpServer = http.createServer(function (req, res) {
  unifiedServer(req, res);
});

// Start httpServer
httpServer.listen(config.httpPort, function () {
    console.log(`Server is listening on port: ${config.httpPort} in ${config.stage} mode`);
});

// httpServerOptions
const httpServerOptions = {
  key: fs.readFileSync('./https/key.pem'),
  certificate: fs.readFileSync('./https/certificate.pem')
};

// Create httpsServer
const httpsServer = https.createServer(httpServerOptions, function (req, res) {
  unifiedServer(req, res);
});

// Start httpsServer
// httpsServer.listen(config.httpsPort, function () {
//     console.log(`Server is listening on port: ${config.httpsPort} in ${config.stage} mode`);
// });

// Unified Server
const unifiedServer = function(req, res) {
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
};

// define handlers
const handlers = {};

// define ping route
handlers.ping = function(data, callback) {
  callback(200);
}

// define 404 notFound handler
handlers.notFound = function(data, callback) {
  callback(404, { 'message': 'Resource Not Found!' });
};

// Define router
const router = {
  'ping': handlers.ping
}
