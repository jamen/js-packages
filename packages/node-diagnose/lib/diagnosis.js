var Diagnosis = function Diagnosis(opts) {
  this.results = opts.results || [];
};

Diagnosis.prototype.report = function(data) {
  this.results.push(data);
  return this;
};

Diagnosis.prototype.fail = function(message) {
  this.report({type: 'fail', message: message});
  return this;
};

Diagnosis.prototype.pass = function(message) {
  this.report({type: 'pass', message: message});
  return this;
};

Diagnosis.prototype.warn = function(message) {
  this.report({type: 'warn', message: message});
  return this;
};

module.exports = Diagnosis;
