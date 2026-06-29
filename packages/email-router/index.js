var router = function router(options) {
  options = options || {};
  var resolve = options.resolve || router.resolve;

  var addressAlign = [];
  var routes = [];

  var route = function route(address) {
    address = resolve(address);
    var args = Array.prototype.slice(arguments, 1);

    if (!address || addressAlign.indexOf(address) === -1) {
      address = options.default;
    }

    var offset = -1;
    for (;;) {
      offset = addressAlign.indexOf(address, offset + 1);
      if (offset < 0) break;
      routes[offset].apply(route, args);
    }
  };

  route.on = function on(address, handler) {
    address = resolve(address);
    addressAlign.push(address);
    routes.push(handler);
  };

  return route;
};

// Default email resolving
router.resolve = function resolve(address) {
  address = address.split('.').join('');
  address = address.slice(0, address.lastIndexOf('+')) || address;
  return address;
};

module.exports = router;
