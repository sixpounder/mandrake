try {
  var srcDir = process.argv[2];
  var mandrake = require('../index');
  mandrake({path: srcDir}, function(err, app) {
    app.listen(3000);
  });
} catch(e) {
  console.log("Could not start mandrake, please provide a source for your files");
  console.log(e);
}
