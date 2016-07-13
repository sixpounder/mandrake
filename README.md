# mandrake
Write your markdown documents -> Start a mandrake instance (or embed it in your express app) -> Read the docs!

## Install and quick usage

#### As a stand alone server
```bash
npm install -g mandrake
mandrake [path-to-your-docs]
```

#### As an express router
```bash
npm install --save mandrake
```

In your code
```javascript
var express = require('express');

var app = express();

app.use(mandrake({docsPath: './docs')});

var http = require('http');

var server = http.createServer(app);
server.listen(3000);
```
