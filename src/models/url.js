const mongoose = require('mongoose');
var URL = mongoose.model('link', {
	ori: String,
	new: String,
	lastActive: Date
});

module.exports = URL;