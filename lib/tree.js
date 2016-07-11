var Moonwalk      = require('moonwalk');
var marked        = require('marked');
var htmlRenderer  = require('./render');
var mkobj         = require('./mkobj');
var fs            = require('fs');
var _             = require('lodash');
var normalizePath = require('./normalize');
var chalk         = require('chalk');

module.exports = function tree(router, options, cb) {
  var m = new Moonwalk(options.docsPath);
  var structure = {};
  var contentIndex = {};
  var rawContentIndex = [];

  m.on('file', function(f) {
    var content = fs.readFileSync(f, 'utf-8');
    var relativePath = f.replace(options.docsPath, '');
    var normalizedPath = normalizePath(relativePath);

    // var rawAdd = {};
    // rawAdd[relativePath] = null;
    // _.merge(rawContentIndex, rawAdd);

    var indexAdd = {};
    indexAdd[normalizedPath] = options.cache === true ? marked(content) : content;

    _.merge(contentIndex, indexAdd);
    _.merge(structure, mkobj(normalizedPath, normalizedPath));

    var parm = options.cache === true ? content : f;

    console.log(`${chalk.cyan("mandrake")} - mount GET ${normalizedPath} ${chalk.green("ok")}`);
    router.get(normalizedPath, htmlRenderer(structure, contentIndex, options));

  }).on('end', function() {

    _.merge(contentIndex, {'/': ''});

    router.get('/', htmlRenderer(structure, contentIndex, options));

    if(cb) {
      cb(null, router);
    }
  });

  m.walk();
};
