var mkobj = function(path, value) {
  var parts = path.split('/').filter(function(el) { return el && el !== '' && el !== null; });
  var o = {};
  var lastRef = o;

  for (var i = 0; i < parts.length; i++) {
    var p = parts[i];
    lastRef[p] = {};
    if (i === parts.length - 1) {
      if (value) {
        lastRef[p] = value;
      } else {
        lastRef[p] = null;
      }
    } else {
      lastRef = lastRef[p];
    }
  }

  // console.log(o);
  return o;
};


module.exports = mkobj;
