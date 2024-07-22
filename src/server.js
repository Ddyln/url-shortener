var express = require('express');
var app = express();
var mongoose = require('mongoose');
var nanoid = require('nanoid');
const path = require('path');
require('dotenv').config();
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
	if (req.url.length > 1 && req.url[1] == '#') {
		URL.findOne({new : req.url})
			.then(result => {
				if (result) {
					// found

				}
				else {
					console.log('Unvalid URL.');
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
	var newUrl = "localhost:5500";
	var id = nanoid.nanoid(10);
	newUrl += "/#" + id;
	const response = {
		link: newUrl,
		old: oldUrl
	}
	res.send(response);
	// insert created link to db
	// URL.create({
	// 	ori: oldUrl,
	// 	link: newUrl,
	// 	lastActive: new Date().toUTCString()
	// })
	// 	.then(res => console.log(res))
	// 	.catch(err => console.log(err));
	// console.log(response);
	res.end();
});

var server = app.listen(5500, '127.0.0.1', () => {
	var host = server.address().address;
	var port = server.address().port;
	console.log("App is listening at: http://%s:%s", host, port);
});