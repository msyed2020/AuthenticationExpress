// separate app logic from actually running app in production, so it depends on each app for sure

var app = require('../app');
var http = require('http');

// get port from env and store in Express

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// building http server
var server = http.createServer(app);

// listen on provided port, on all network interfaces
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);