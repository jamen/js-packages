(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var extending = require('extending');
var observe = require('./observe');

var arzo = module.exports = function arzo(initial, body) {
  initial = initial || {};

  // Create component.
  return extending({
    component: true,
    render: arzo.render,
    body: body
  }, initial, arzo._observers);
};

arzo._observers = function _extending(item) {
  if (item.data) {
    if (typeof item.data === 'function') {
      item.data = item.data(item);
    }
    var observed = function observed() {
      item.render(item);
    };
    item.data = observe(item.data, observed);
    observe(item.data, observed, item);
  }
};

arzo.render = function _createBinding(component, mount) {
  if (component.el) {
    mount = document.createElement(component.el);
  }
  mount = mount || document.createElement('div');
  if (component.body) {
    var body = component.body(component);
    var type = body.constructor;
    if (type === String) {
      if (mount) {
        mount.innerHTML = body;
      } else {
        mount = document.createTextNode(body);
      }
    } else if (body instanceof Node) {
      mount = body;
    } else {
      for (var c = 0, maxbody = body.length; c < maxbody; c++) {
        var child = arzo._toNode(body[c]);
        if (mount.children[c]) {
          mount.replaceChild(child, mount.childNodes[c]);
        } else {
          mount.appendChild(child);
        }
      }
    }
  }

  // Attributes...
  if (component.attr) {
    var attrs = Object.keys(component.attr);
    for (var a = 0, maxattr = attrs.length; a < maxattr; a++) {
      var attr = attrs[a];
      var data = component.attr[attr];
      mount.setAttribute(attr, data);
    }
  }

  // Events ...
  if (component.event) {
    var events = Object.keys(component.event);
    for (var e = 0, maxevt = events.length; e < maxevt; e++) {
      var event = events[e];
      var fn = component.event[event];
      if (mount['on' + event] !== fn) {
        mount['on' + event] = fn;
      }
    }
  }

  return mount;
};

arzo._toNode = function _toNode(item) {
  if (item.component) {
    return arzo.render(item);
  }

  if (typeof item === 'string') {
    return document.createTextNode(item);
  }

  return null;
};

},{"./observe":5,"extending":3}],2:[function(require,module,exports){
'use strict';
var isObj = require('is-obj');
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Sources cannot be null or undefined');
	}

	return Object(val);
}

function assignKey(to, from, key) {
	var val = from[key];

	if (val === undefined || val === null) {
		return;
	}

	if (hasOwnProperty.call(to, key)) {
		if (to[key] === undefined || to[key] === null) {
			throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
		}
	}

	if (!hasOwnProperty.call(to, key) || !isObj(val)) {
		to[key] = val;
	} else {
		to[key] = assign(Object(to[key]), from[key]);
	}
}

function assign(to, from) {
	if (to === from) {
		return to;
	}

	from = Object(from);

	for (var key in from) {
		if (hasOwnProperty.call(from, key)) {
			assignKey(to, from, key);
		}
	}

	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(from);

		for (var i = 0; i < symbols.length; i++) {
			if (propIsEnumerable.call(from, symbols[i])) {
				assignKey(to, from, symbols[i]);
			}
		}
	}

	return to;
}

module.exports = function deepAssign(target) {
	target = toObject(target);

	for (var s = 1; s < arguments.length; s++) {
		assign(target, arguments[s]);
	}

	return target;
};

},{"is-obj":4}],3:[function(require,module,exports){
var assign = require('deep-assign');
var toObject = function toObject(item) {
  var res = assign({}, item);

  /* eslint no-use-before-define: 0 */
  for (var prop in extending.helpers) {
    if (prop in res) {
      delete res[prop];
    }
  }

  return res;
};

var extending = module.exports = function extending(input, extension, alter) {
  var extendable = function extendable(create) {
    return extending(extendable, create, alter);
  };
  assign(extendable, extending.helpers, input, extension);
  if (alter) {
    alter(extendable);
  }
  return extendable;
};

extending.helpers = {
  extend: function(input) {
    return extending(this, input);
  },
  toObject: function() {
    return toObject(this);
  },
  toJSON: function() {
    return toObject(this);
  }
};

},{"deep-assign":2}],4:[function(require,module,exports){
'use strict';
module.exports = function (x) {
	var type = typeof x;
	return x !== null && (type === 'object' || type === 'function');
};

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
var arzo = require('..');

var input = arzo({
  el: 'input',
  attr: {id: 'class'},
  data: {value: ''}
});

var display = arzo({
  el: 'div',
  data: {value: ''}
}, function(component) {
  return [component.value];
});

var mirror = arzo({
  data: {value: ''}
}, function(component) {
  console.log(component.value);
  return [
    input({
      event: {
        keyup: function(e) {
          component.value = e.target.value;
        }
      }
    }),
    display({data: {value: component.value}})
  ];
});

document.addEventListener('DOMContentLoaded', function() {
  arzo.render(mirror(), document.body);
});

},{"..":1}]},{},[6]);
