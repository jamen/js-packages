var report = require('../report')

exports.create = typeInvalid
exports.meta = {
  docs: {
    description: 'Mismatching types',
    category: 'Typling',
    recommended: true
  }
}

function typeInvalid (context) {
  function Program (node) {
    report(context, node, 'TypeInvalid')
  }
  return { Program: Program }
}
