var typling = require('typling-ast')

module.exports = {
  rules: {
    typling: {
      meta: {
        docs: {
          description: "Checks types using comments",
          category: "Typling",
          recommended: true
        }
      }
      create: function (context) {
        console.log('Hello')
        return {
          Program: function (node) {
            var reports = typling.check(node)
            for (var i = reports.length; i--;) {
              var report = report[i]
              context.report({
                message: report.name + ': ' + report.message,
                node: report.node
              })
            }
          }
        }
      }
    }
  }
}
