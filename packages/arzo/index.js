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
