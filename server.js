var express = require('express');
var app = express();

app.use(express.static('./'));

app.get('/', function (req, res) {
	res.sendFile( __dirname + "/index.html" );
})

app.get('/process', function (req, res) {
	const oldUrl = req.query.link;
	var newUrl = "localhost:5500";

	//Lets connect to our database using the DB server URL.
	var mongoose = require('mongoose');
	mongoose.connect('mongodb+srv://user:abcd1234@cluster-mongo-test.ueql9iv.mongodb.net/url-shortener?retryWrites=true&w=majority&appName=cluster-mongo-test')
		.then((result) => {
			var URL = mongoose.model('link', {
				ori: String,
				new: String
			});
			URL.findOne({ori: oldUrl})
				.then(result => {
					if (!result) {
						// already exists in database
						console.log("Not found");
					}
					else {
						// otherwise
						console.log("Found");
						newUrl += "/" + result.new;
					}
					const response = {
						link: newUrl
					};
					res.send(response);
					console.log(response);
				})
				.catch(err => console.log(err));
		})
		.catch(error => {throw error;});
	// res.end(JSON.stringify(response));
	// res.redirect("http://www.facebook.com");
});


var server = app.listen(5500, '127.0.0.1', function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("App is listening at: http://%s:%s", host, port);
});