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
const config = require('./lib/config');
const handlers = require('./lib/handlers');
const helpers = require('./lib/helpers');

// Create http server
const httpServer = http.createServer((req, res) => {
  unifiedServer(req, res);
});

// Start httpServer
httpServer.listen(config.httpPort, () => {
    console.log(`Server is listening on port: ${config.httpPort} in ${config.stage} mode`);
});

// httpServerOptions
const httpServerOptions = {
  key: fs.readFileSync('./https/key.pem'),
  certificate: fs.readFileSync('./https/certificate.pem')
};

// Create httpsServer
const httpsServer = https.createServer(httpServerOptions, (req, res) => {
  unifiedServer(req, res);
});

// Start httpsServer
// httpsServer.listen(config.httpsPort, function () {
//     console.log(`Server is listening on port: ${config.httpsPort} in ${config.stage} mode`);
// });

// Unified Server
const unifiedServer = (req, res) => {
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

  req.on('data', (data) => {
    buffer += decoder.write(data);
  });

  req.on('end', () => {

    buffer += decoder.end();
    const payload = helpers.parseJsonToObject(buffer);

    // spicify the requested resource
    const handlerPath = router.hasOwnProperty(trimmedPath) ? router[trimmedPath] : handlers.notFound;


    // Construct data object to send to handler
    const data = {
      headers,
      method,
      queryStringObject,
      trimmedPath,
      payload
    }

    // route the request to the handler
    handlerPath(data, (statusCode, payload) => {

      // Use the status code returned from the handler, or set the default status code to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
      // set default default payload
      payload = typeof(payload) == 'object' ? payload : {};

      // convert payload to a string
      const payloadString = JSON.stringify(payload);

      // Response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
      // info log
      // console.info(`
      //   Request received on path: ${trimmedPath}\n
      //   The method is ${method}\n
      //   The payload is: ${buffer}\n
      //   Query String Object: %j\n
      //   Headers: %j\n
      //   Returned payload: ${payloadString}\n
      //   `, queryStringObject, headers);
    });
  });
};

// Define router
const router = {
  'ping': handlers.ping,
  'users': handlers.users
}
