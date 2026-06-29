var report = require('../report')

exports.create = typeMissing
exports.meta = {
  docs: {
    description: 'Unknown type',
    category: 'Typling',
    recommended: true
  }
}

function typeMissing (context) {
  function Program (node) {
    report(context, node, 'TypeMissing')
  }
  return { Program: Program }
}
