var Hapi = require('hapi');
var Path = require('path');
var server = new Hapi.Server();
var fs = require('fs');
var rot13 = require('rot13-transform');

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.route({path: '/', method:'GET', handler: function(request, reply) {
  var stream = fs.createReadStream(Path.join(__dirname, 'file.txt'));

  reply(stream.pipe(rot13()));
}});

server.start();
