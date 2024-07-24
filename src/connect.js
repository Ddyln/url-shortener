const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')});
const atlasURL = process.env.ATLAS_URL;

const connectToDatabase = async () => {
    var mongoose = require('mongoose');
    mongoose.connect(atlasURL)
        .then((result) => {
            console.log('Connected');
            var URL = mongoose.model('link', {
                ori: String,
                new: String,
                lastActive: Date
            });
            URL.create({
                ori: 'localhost:5500',
                new: 'localhost:5500',
                lastActive: new Date().toUTCString()
            })
                .then(res => console.log(res)); 
        })
        .catch(error => {throw error;});
}

const resetDatabase = async () => {
    var mongoose = require('mongoose');
    mongoose.connect(atlasURL)
        .then((result) => {
            console.log('Connected');
            var URL = mongoose.model('link', {
                ori: String,
                new: String,
                lastActive: Date
            });
            URL.deleteMany()
                .then(result => {
                    console.log(result);
                    URL.create({
                        ori: 'localhost:5500',
                        new: 'localhost:5500',
                        lastActive: new Date().toUTCString()
                    })
                        .then(res => console.log(res)); 
                });
        })
        .catch(error => {throw error;});
}

resetDatabase();