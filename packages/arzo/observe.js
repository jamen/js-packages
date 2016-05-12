var define = Object.defineProperty;

module.exports = function observe(item, event, observer) {
  event = event || {};

  // Create observer.
  observer = observer || {};
  define(observer, '__observe', {value: item});
  var props = Object.keys(item);
  for (var i = 0, max = props.length; i < max; i++) {
    (function(prop) {
      var compvalue = observer.__observe[prop];
      var type = typeof compvalue;
      define(observer, prop, {
        set: function set(value) {
          var vt = typeof value;
          if (value !== null && (vt === 'object' || vt === 'function')) {
            observer.__observe[prop] = observe(value, event);
          } else {
            observer.__observe[prop] = value;
          }
          if (event) {
            event();
          }
        },
        get: function get() {
          return observer.__observe[prop];
        },
        enumerable: true
      });
      if (compvalue !== null && (type === 'object' || type === 'function')) {
        observer.__observe[prop] = observe(compvalue, event);
      }
    })(props[i]);
  }

  return observer;
};
