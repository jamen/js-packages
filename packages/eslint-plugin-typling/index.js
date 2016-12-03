var typling = require('typling-ast')

module.exports = {
  rules: {
    types: {
      meta: {
        docs: {
          description: "Checks types using comments",
          category: "Typling",
          recommended: true
        },
        schemas: []
      },
      create: function (context) {
        return {
          Program: function (node) {
            var reports = typling.check(node)
            for (var i = 0, max = reports.length; i < max; i++) {
              var report = reports[i]
              context.report({
                message: report.message,
                node: report.target
              })
            }
          }
        }
      }
    }
  }
}
