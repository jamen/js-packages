var typling = require('typling-ast')

exports.create = types
exports.meta = { description: 'Verify typling types' }

// The `typling/types` rule
function types (context) {
  // Handler for the `Program` node
  function Program (node) {
    // Generate report from program and map TypeErrors to eslint reports
    typling.check(node).forEach(function (report) {
      context.report({ message: report.message, node: report.target })
    })
  }

  return { Program: Program }
}
