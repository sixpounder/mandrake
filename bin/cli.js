var http = require('http');
try {
  var srcDir = process.argv[2];
  var app = require('../lib/express-app')({path: srcDir, viewEngine: 'pug', views: __dirname + '/../views'}, function(err, app) {
    http.createServer(app).listen(3000);
  });

} catch(e) {
  console.log("Could not start mandrake, please provide a source for your files");
  console.log(e);
}
