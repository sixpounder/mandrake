var express = require('express');
var mandrake = require('../index');


module.exports = function(options, callback) {
  var app = express();

  try {
    mandrake(options, function(err, router) {
      try {
        if(options.log === true) {
          app.use(require('morgan')('dev'));
        }
      } catch(e) {
        console.log("Module morgan not installed. Please npm install it if you wish to see request logs.");
      }


      app.use(router);

      app.set('views', options.views || 'pug');
      app.set('view engine', options.viewEngine || __dirname + "/../views");

      if(options.statics) {
        _.forEach(manifest.statics, function(s) {
          app.use(express.static(path.resolve(options.resolvedPath, s)));
        });
      }

      return callback(null, app);

    });


  } catch (e) {
    throw e;
  }

};
