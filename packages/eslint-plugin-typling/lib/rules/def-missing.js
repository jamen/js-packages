var report = require('../report')

exports.create = defMissing
exports.meta = {
  docs: {
    description: 'Unknown definition',
    category: 'Typling',
    recommended: true
  }
}

function defMissing (context) {
  function Program (node) {
    report(context, node, 'DefinitionMissing')
  }
  return { Program: Program }
}
