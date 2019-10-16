const Attr = require('attributes');

const Domain = function(name, primary, secondary){
  this.$name = name;
  this.$primaryAttribute = primary;
  this.$secondaryAttribute = secondary;
}

Domain.prototype.name = function(val) {
  return this.$name;
}

Domain.prototype.primaryAttribute = function() {
  return this.$primaryAttribute;
}

Domain.prototype.secondaryAttribute = function() {
  return this.$secondaryAttribute;
}

exports = module.exports = Domain;
