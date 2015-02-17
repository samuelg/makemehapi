var Hapi = require('hapi');
var util = require('util');
var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.route({path: '/{name}', method:'GET', handler: getRoot});

function getRoot(request, reply) {
  reply(util.format('Hello %s', encodeURIComponent(request.params.name)));
}

server.start();
