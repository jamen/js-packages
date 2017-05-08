
exports.plugins = [
  // Some ES6+ stuff:
  require('babel-plugin-transform-es2015-template-literals'),
  require('babel-plugin-transform-es2015-arrow-functions'),
  require('babel-plugin-transform-es2015-block-scoping'),
  require('babel-plugin-transform-es2015-destructuring'),
  require('babel-plugin-transform-es2015-parameters'),
  require('babel-plugin-transform-es2015-spread'),
  require('babel-plugin-transform-es2015-shorthand-properties'),
  require('babel-plugin-transform-es2015-computed-properties'),
  [ require('babel-plugin-transform-object-rest-spread'), { useBuiltIns: true }  ],
  // Non-standard
  require('babel-plugin-pull'),
  require('babel-plugin-implicit-return'),
  [ require('babel-plugin-transform-react-jsx'), { pragma: 'h' } ]
]
  
