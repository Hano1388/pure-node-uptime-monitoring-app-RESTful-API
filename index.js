/*
 * Main API file
 *
 */

// Dependencies
const http = require('http');

const server = http.createServer(function (req, res) {
    res.end('Hello, there!');
});

server.listen(3000, function () {
    console.log('Server is listening on port: 3000');
});