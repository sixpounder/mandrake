var fs         = require('fs');
var marked     = require('marked');
var _          = require('lodash');
var treeRender = require('./treeRender');

module.exports = function(structure, contentIndex, options) {

  return function(req, res, next) {
    let html = null;
    if(options.cache === true) {
      html = contentIndex[req.url];
    } else {
      let content = contentIndex[req.url];
      html = (content && _.isString(content)) ? marked(content) : null;
    }

    res.render(options.template, {
      _: _,
      renderTree: treeRender(req, structure, options),
      contentIndex: contentIndex,
      structure: structure,
      html: html
    });

    // } else {
    //   fs.readFile(_.key(contentIndex, req.url), 'utf-8', function(err, content) {
    //     if(err) {
    //       res.status(500);
    //       res.end();
    //     } else {
    //       res.render(options.template, {structure: structure, html: marked(content)});
    //     }
    //   });
    // }

  };
};
