var express = require('express');
var _       = require('lodash');
var path    = require('path');

var tree    = require('./lib/tree');

module.exports = function mandrake(options, cb) {
  _.defaults(options, {name: '', path: './', mountPoint: '/', docsPath: './', app: undefined, template: 'template', cache: true, log: true});

  options.resolvedPath = path.resolve(options.path);

  var manifest = require(path.resolve(options.resolvedPath, 'mandrake.json'));

  options = _.defaultsDeep(manifest, options);

  options.docsPath = path.resolve(options.resolvedPath, options.docsPath);

  var app;

  if(_.isUndefined(options.app)) {
    app = express();
    try {
      if(options.log === true) {
        app.use(require('morgan')('dev'));
      }
    } catch (e) {
      console.log("Module morgan not installed. Please npm install it if you wish to see request logs.");
    }

    app.set('views', './views');
    app.set('view engine', 'pug');
  } else {
    app = options.app;
  }

  if(manifest.statics) {
    _.forEach(manifest.statics, function(s) {
      app.use(express.static(path.resolve(options.resolvedPath, s)));
    });
  }

  var router = express.Router();

  tree(router, options, function done(err, modifiedRouter) {
    if(err) {
      if(_.isFunction(cb)) {
        return cb(err);
      } else {
        return null;
      }
    } else {
      app.use(options.mountPoint, modifiedRouter);

      if(_.isFunction(cb)) {
        return cb(null, options.app ? modifiedRouter : app);
      } else {
        return null;
      }
    }

  });

};
