var express = require('express');
var app = express();
var mongoose = require('mongoose');
var nanoid = require('nanoid');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')});
const serverIP = process.env.SERVER_IP;
const port = process.env.PORT;
var URL = mongoose.model('link', {
	ori: String,
	new: String,
	lastActive: Date
});
const url = process.env.ATLAS_URL;
mongoose.connect(url)
	.then(result => {
		console.log('Connected!');
	})
	.catch(err => {
		console.log(err);
	});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/', (req, res, next) => {
	console.log(req.url);
	if (req.url.length > 1 && req.url[1] == '@') {
		URL.findOne({new : req.url})
			.then(result => {
				if (result) {
					console.log('Found one!');
					res.redirect(result.ori);
				}
				else {
					console.log('Unvalid URL!');
				}
			});
	}
	else next();
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, "view/index.html"));
});

app.get('/process', async (req, res) => {
	const oldUrl = req.query.link;
	var newUrl = serverIP + ":" + port;
	var id = nanoid.nanoid(10);
	newUrl += "/@" + id;
	URL.create({
		ori: oldUrl,
		new: "/@" + id,
		lastActive: new Date().toUTCString()
	});
	const response = {
		link: newUrl,
		old: oldUrl
	};
	res.send(response);
	res.end();
});

var server = app.listen(port, serverIP, () => {
	var host = server.address().address;
	var port = server.address().port;
	if (host == '::1') host = 'localhost';
	console.log("App is listening at: http://%s:%s", host, port);
});