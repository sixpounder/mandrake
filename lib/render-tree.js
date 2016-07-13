var _ = require('lodash');

module.exports = function(req, structure, options) {

  var renderTree = function(opts) {
    if(_.isUndefined(opts)) {
      opts = {};
    }

    _.defaults(opts, {parentContainerTag: 'div', parentContainerClass: 'list-group', parentLinkTag: 'a', parentLinkClass: 'list-group-item-parent text-muted', linkTag: 'a', linkClass: 'list-group-item', activeLinkClass: 'active'});

    var step = function(subtree) {
      var acc = "";
      acc += `<${opts.parentContainerTag} class="${opts.parentContainerClass}">`;

      _.forOwn(subtree, function(v,k) {
        if(_.isObject(v)) {
          acc += `<${opts.parentLinkTag} class="${opts.linkClass} ${opts.parentLinkClass}" href="#">${_.startCase(k)}</${opts.parentLinkTag}>`;
          acc += step(v);
        } else {

          let cls = req.url === v ? 'active' : '';
          acc += `<${opts.linkTag} class="${opts.linkClass} ${cls}" href="${options.mountPoint}${v}">${_.startCase(k)}</${opts.linkTag}>`;
        }
      });

      acc += `</${opts.parentContainerTag}>`;

      return acc;
    };

    return step(structure);

  };

  return renderTree;
};
