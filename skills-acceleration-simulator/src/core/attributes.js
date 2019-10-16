

const Attributes = function(opts) {
  opts = opts || {};

  this.$label = opts.label || "";
  this.$perception = opts.perception || 0;
  this.$memory = opts.memory || 0;
  this.$willpower = opts.willpower || 0;
  this.$intelligence = opts.intelligence || 0;
  this.$charisma = opts.charisma || 0;
}

Attributes.prototype.label = function(val) {
  if (isString(val)) {
    this.$label = val;
  } else {
    return this.$label;
  }
}

Attributes.prototype.perception = function(val) {
  if (isNumber(val)) {
    this.$perception = val;
  } else {
    return this.$perception;
  }
}

Attributes.prototype.memory = function(val) {
  if (isNumber(val)) {
    this.$memory = val;
  } else {
    return this.$memory;
  }
}

Attributes.prototype.willpower = function(val) {
  if (isNumber(val)) {
    this.$willpower = val;
  } else {
    return this.$willpower;
  }
}

Attributes.prototype.intelligence = function(val) {
  if (isNumber(val)) {
    this.$intelligence = val;
  } else {
    return this.$intelligence;
  }
}

Attributes.prototype.charisma = function(val) {
  if (isNumber(val)) {
    this.$charisma = val;
  } else {
    return this.$charisma;
  }
}

Attributes.prototype.toString = function() {
  return 'Attributes{"' + this.$label
          + '" Perception:' + this.$perception
          + ', Memory:' + this.$memory
          + ', Willpower:' + this.$willpower
          + ', Intelligence:' + this.$intelligence
          + ', Charisma:' + this.$charisma + '}';
}

function isNumber(val) {
  return undefined != val && typeof(val) == "number";
}

function isString(val) {
  return undefined != val && typeof(val) == "string";
}

function isAttributs(val) {
  return undefined != val && val instanceof Attributes
}

function createAttributes(label, perception, memory, willpower, intelligence, charisma) {
  return new Attributes({
    perception: perception,
    memory: memory,
    intelligence: intelligence,
    charisma: charisma,
    willpower: willpower,
    label: label
  })
}

const AttributesSimulaor = function() {
  this.$indexes = [];
  this.$collection = [];
}

AttributesSimulaor.prototype.reset = function() {
  this.$indexes = [];
  this.$collection = [];
}

AttributesSimulaor.prototype.add = function(val){
  if (!isAttributs(val)) {
    throw new Error('Invalid Parameter');
  }
  this.$indexes.push(val.label());
  this.$collection.push(val);
}

AttributesSimulaor.prototype.remove = function(label) {
  if (!isString(label)) {
    throw new Error('Invalid Parameter');
  }

  var index = this.$indexes.lastIndexOf(label)
  if (-1 < index && this.$indexes.length > index) {
    this.$indexes.splice(index, 1);
    this.$collection.splice(index, 1);
  }
}

AttributesSimulaor.prototype.calculate = function() {
  const TOTAL = this.$collection.length;
  var base = createAttributes("Simulated", 0, 0, 0, 0, 0);
  for (var i = 0; i < TOTAL; i++) {
    var step = this.$collection[i];
    base.$perception += step.$perception;
    base.$memory += step.$memory;
    base.$willpower += step.$willpower;
    base.$intelligence += step.$intelligence;
    base.$charisma += step.$charisma;
  }
  return base;
}

AttributesSimulaor.prototype.toString = function() {

  const INDENT = "  ";

  var ret = "Simulator{\n"
          + INDENT + "attributes:[\n";

  var list = this.$collection;
  for (var i = 0; i < list.length; i++) {
    ret += INDENT + INDENT + list[i].toString() + "\n";
  }

  ret += INDENT + "],\n"
  ret += INDENT + "total: " + calculate().toString() + "\n";
  ret += "}";

  return ret;
}


const DEFAULT_ATTRIBUTE = 17;
const DEFAULT_ATTRIBUTE_LABEL = "Default"

exports = module.exports = {
  Attributes: Attributes,
  isAttributes: isAttributs,
  create: createAttributes,
  DEFAULT_ATTRIBUTES: createAttributes(
    DEFAULT_ATTRIBUTE_LABEL,
    DEFAULT_ATTRIBUTE,
    DEFAULT_ATTRIBUTE,
    DEFAULT_ATTRIBUTE,
    DEFAULT_ATTRIBUTE),
  Simulator: AttributesSimulaor
}
