var deepApply = require('./deep-apply');

module.exports = function arzo(body, defaultState) {
  var state = {};
  var cache = body;
  body = typeof body === 'function' ? body : function body() { return cache; };
  defaultState = defaultState || {};

  // Shorthand rendering.
  function component() {
    return component.render.apply(this || component, arguments);
  }

  // Some helpful properties.
  component.constructor = null;
  component.component = true;
  component.body = body;

  // Default DOM rendering.
  component.render = function dom(data, el) {
    data = data || {};
    if (data instanceof Node) el = data;
    var name = data.el || component.state('el') || 'div';
    el = el || document.createElement(name);

    // Attach listeners.
    var event = data.event || component.state('event');
    if (event) {
      for (var prop in event) {
        el['on' + prop] = event[prop].bind(component);
      }
    }

    // Attach attributes
    var attr = data.attr || component.state('attr');
    if (attr) {
      for (var name in attr) {
        el.setAttribute(name, attr[name]);
      }
    }

    // Process body.
    var body = component.body && component.body(component);
    if (body) {
      if (body.constructor === Array) {
        for (var i = 0, max = body.length; i < max; i++) {
          var child = _toNode(body[i]);
          if (typeof el.children[i] !== 'undefined') {
            el.replaceChild(child, el.children[i]);
          } else {
            el.appendChild(child);
          }
        }
      } else if (body.constructor === String) {
        el.innerHTML = body;
      }
    }

    return el;
  };

  // State managment function.
  component.state = function setState(name, value) {
    // Setting
    if (name.constructor === Object && arguments.length === 1) {
      deepApply(state, name);
    } else if (name.constructor === String && arguments.length === 2) {
      var parent = _safeGet(name, state, 1);
      name = name.split('.');
      var prop = name[name.length - 1];
      state[prop] = value;
    }

    // Getting
    if (arguments.length === 1) {
      if (name.constructor === String) return _safeGet(name, state);
      else if (name.constructor === Array) {
        var output = {};
        for (var i = 0, max = name.length; i < max; i++) {
          var item = name[i];
          output[item] = _safeGet(item, name);
        }
        return output;
      }
    }

    component.render();
    return value;
  }

  // Serializing to JSON.
  component.toJSON = function toJSON() {
    return { state: state, body: body() };
  };

  // Setting the default state and returning.
  component.state(defaultState);
  return component;
}

function _toNode(input) {
  if (typeof input === 'undefined') input = '';
  if (input.constructor === String) {
    return document.createTextNode(input);
  }

  if (input instanceof Node) {
    return input;
  }
}

function _safeGet(name, start, end) {
  end = end || 0;
  var path = name.split('.');
  var item = start;
  for (var i = 0, max = path.length - end; i < max; i++) {
    item = item[path[i]];
  }
  return item;
}
