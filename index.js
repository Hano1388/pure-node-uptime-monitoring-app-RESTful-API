/*
 * Main API file
 *
 */

// Dependencies
const http = require('http');
const url = require('url');

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
    // Response
    res.end('Hello, there!');
    // Log requested path and request method
    console.log(`
      Request received on path: ${trimmedPath}\n
      The method is ${method}\n
      Query String Object: %j\n
      `, queryStringObject);
});

// Start server on port 3000
server.listen(3000, function () {
    console.log('Server is listening on port: 3000');
});
