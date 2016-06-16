var Diagnosis = function Diagnosis(opts) {
  this.results = opts.results || [];
};

Diagnosis.prototype.fail = function(message) {
  this.results.push({type: 'fail', message: message});
};

Diagnosis.prototype.pass = function(message) {
  this.results.push({type: 'pass', message: message});
};

Diagnosis.prototype.warn = function(message) {
  this.results.push({type: 'warn', message: message});
};

module.exports = Diagnosis;
