var Hapi = require('hapi');
var Path = require('path');
var Joi = require('joi');
var util = require('util');
var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.route({
  path: '/chickens/{breed}',
  method:'GET',
  handler: function(request, reply) {
    reply(util.format('breed: %s', request.params.breed));
  },
  config: {
    validate: {
      params: {
        breed: Joi.string().required()
      }
    }
  }
});

server.start();
