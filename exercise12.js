var Hapi = require('hapi');
var Boom = require('boom');
var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.state('session', {
  path: '/',
  ttl: 10,
  encoding: 'base64json',
  domain: 'localhost'
});

server.route({
  path: '/set-cookie',
  method:'GET',
  handler: function(request, reply) {

    reply('COOKIES!').state('session', {key: 'makemehapi'});
  },
  config: {
    state: {
      parse: true,
      failAction: 'log'
    }
  }
});

server.route({
  path: '/check-cookie',
  method:'GET',
  handler: function(request, reply) {
    var session = request.state.session;

    if (session && session.key) {
      reply({user : 'hapi'});
    } else {
      reply(Boom.badRequest('Invalid cookie value'));
    }
  },
  config: {
    state: {
      parse: true,
      failAction: 'log'
    }
  }
});

server.start();
