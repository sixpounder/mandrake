# mandrake
Write your markdown documents -> Start a mandrake instance (or embed it in your express app) -> Read the docs!

## Install and quick usage

#### As a stand alone server
```bash
npm install -g mandrake
mandrake [path-to-folder]
```

#### With your existing express app
```bash
npm install --save mandrake
```

In your code
```javascript
var express = require('express');
var mandrake = require('mandrake');

var app = express();

app.set('view engine', 'pug');
app.set('views', './node_modules/mandrake/views');

mandrake({path: __dirname}, function(err, router) {
  app.use(router);
  var http = require('http');

  var server = http.createServer(app);
  server.listen(3000);
});
```

## Manifest
When you use mandrake, either cli or programmatic, it will look into ```path``` for a file named **mandrake.json**. Any value in this json file will be used to override settings for mandrake.

For instance, with the programmatic example above, this file could contain a value for **docsPath** pointing to a subdirectory of **path**.

**docsPath** take precedence over **path** for indexing documents.

## API
```javascript
mandrake(options, callback);
```

### Options
type: *object*
Can specify one or more of the following properties:
- **name**: Will be used as an header to your docs
- **path**: A path were a manifest file is located. Defaults to current working directory.
- **docsPath**: Path relative to **options.path** where documents are located.
- **mountPoint**: When the express router will be created, this mount point will be used as root for all generated urls.
- **views** and **viewEngine**: in cli mode these values will be used to setup response.render options. Default to pug renderer and mandrake's built-in default template path.
- **statics**: in cli mode, any path in this array will be mounted with a express.static middleware.
- **log**: whatever to append log messages with morgan logger. Defaults to true.
- **template**: the name of the template to render when a request to any of the urls of the mandrake router is made. Defaults to 'template'

### Callback
A callback will be fired once documents are indexed. First argument will be an error, second argument will be an express router that you can ```use``` on your app.
