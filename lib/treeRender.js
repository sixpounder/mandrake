var _ = require('lodash');

module.exports = function(req, structure, options) {

  var renderTree = function(opts) {
    if(_.isUndefined(opts)) {
      opts = {};
    }

    _.defaults(opts, {parentContainerClass: 'list-group', parentLinkClass: 'list-group-item-parent text-muted', linkClass: 'list-group-item', activeLinkClass: 'active'});

    var step = function(subtree) {
      var acc = "";
      acc += `<div class="${opts.parentContainerClass}">`;

      _.forOwn(subtree, function(v,k) {
        if(_.isObject(v)) {
          acc += `<a class="${opts.linkClass} ${opts.parentLinkClass}" href="#">${_.startCase(k)}</a>`;
          acc += step(v);
        } else {

          let cls = req.url === v ? 'active' : '';
          acc += `<a class="${opts.linkClass} ${cls}" href="${options.mountPoint}${v}">${_.startCase(k)}</a>`;
        }
      });

      acc += '</div>';

      return acc;
    };

    return step(structure);

  };

  return renderTree;
};
