var typling = require('typling-core')

module.exports = function (context, node, name) {
  var result = context.__cache || typling.check(node)
  if (!context.__cache) context.__cache = result
  var reports = result.report
  for (var i = 0, max = reports.length; i < max; i++) {
    var report = reports[i]
    if (report.name === name) {
      context.report({
        message: report.message,
        loc: { start: { line: report.line, column: report.column } }
      })
    }
  }
}
