var Hapi = require('hapi');
var Path = require('path');
var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.route({path: '/foo/bar/baz/{file}', method:'GET', handler: {
  directory: {
    path: Path.join(__dirname, '/public')
  }
}});

server.start();
