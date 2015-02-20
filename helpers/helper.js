var util = require('util');

module.exports = function(context) {
  var name = context.data.root.query.name;
  var suffix = context.data.root.query.suffix;

  return util.format('%s%s', name, suffix);
};
