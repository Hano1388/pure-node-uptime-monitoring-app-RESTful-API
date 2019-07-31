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
    // Response
    res.end('Hello, there!');
    // Log requested path
    console.log('Request received on path: ', trimmedPath);
});

// Start server on port 3000
server.listen(3000, function () {
    console.log('Server is listening on port: 3000');
});