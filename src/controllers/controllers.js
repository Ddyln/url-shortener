const URL = require('../models/url.js');
const path = require('path');
var nanoid = require('nanoid');
require('dotenv').config({path: path.join(__dirname, '../.env')});
const serverIP = process.env.SERVER_IP;
const port = process.env.PORT;

const checkURL = (req, res, next) => {
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
}

const getRoot = (req, res) => {
    // console.log(__dirname);
	res.sendFile(path.join(__dirname, "../view/index.html"));
}

const getProcess = async (req, res) => {
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
}

module.exports = {
    checkURL, 
    getRoot,
    getProcess
};