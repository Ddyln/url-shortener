var express = require('express');
var app = express();

app.use(express.static('./'));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/index.html" );
})

app.get('/process', function (req, res) {
   response = {
        link:req.query.link
   };
   console.log(response);
   res.end(JSON.stringify(response));
});

var server = app.listen(5500, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App is listening at: http://%s:%s", host, port)

})
