var express = require('express');
var app = express();
var mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')});
const serverIP = process.env.SERVER_IP;
const port = process.env.PORT;
const url = process.env.DB_URL;
const initWebRoutes = require('./route/web.js');

// connect to db
mongoose.connect(url)
	.then(result => {
		console.log('Connected!');
	})
	.catch(err => {
		console.log(err);
	});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

initWebRoutes(app);

var server = app.listen(port, serverIP, () => {
	var host = server.address().address;
	var port = server.address().port;
	if (host == '::1') host = 'localhost';
	console.log("App is listening at: http://%s:%s", host, port);
});
