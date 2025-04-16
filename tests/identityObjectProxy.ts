module.exports = new Proxy(
  {},
  {
    get: function getter(_, key) {
      if (key === "__esModule") {
        return true;
      }
      return key;
    },
  }
);
