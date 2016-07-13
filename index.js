var _       = require('lodash');
var path    = require('path');
var tree    = require('./lib/tree');
var express = require('express');

module.exports = function mandrake(options, cb) {
  if(_.isUndefined(options)) {
    options = {};
  }

  _.defaults(options, {name: '', path: process.cwd(), mountPoint: '', template: 'template', viewEngine: 'pug', views: __dirname + '/views', cache: true, log: true});

  var manifest;
  options.path = path.resolve(options.path);

  try {
    manifest = require(path.resolve(options.path, 'mandrake.json'));
  } catch(e) {
    manifest = {};
  }

  options = _.defaultsDeep(manifest, options);

  if(options.docsPath) {
    options.docsPath = path.resolve(options.path, options.docsPath);
  } else {
    options.docsPath = options.path;
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
      if(_.isFunction(cb)) {
        return cb(null, modifiedRouter);
      } else {
        return null;
      }
    }

  });

};
