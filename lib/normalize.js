var _ = require('lodash');

module.exports = function(path) {
  var parts = path.split('/').filter(function(el) { return el && el !== ''; });

  var normalizedPath = parts.map(function(p) {
    if(p.match(/^[0-9]+\-.*$/)) {
      p = p.substring(p.indexOf('-') + 1, p.length);
    }

    if(p.match(/^.*\.md$/)) {
      // Strip extension
      p = p.substring(0, p.length - 3);
    }

    return p;
  }).join("/");

  if(!_.startsWith(normalizedPath, "/")) {
    normalizedPath = "/" + normalizedPath;
  }

  return normalizedPath;
};
