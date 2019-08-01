/*
 * Main API file
 *
 */

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

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
      // Response
      res.end('Hello, there!');
      // Log requested path and request method
      console.log(`
        Request received on path: ${trimmedPath}\n
        The method is ${method}\n
        The payload is: ${buffer}\n
        Query String Object: %j\n
        Headers: %j\n
        `, queryStringObject, headers);
    });
});

// Start server on port 3000
server.listen(3000, function () {
    console.log('Server is listening on port: 3000');
});
