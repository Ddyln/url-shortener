const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')});
const atlasURL = process.env.ATLAS_URL;
const serverIP = process.env.SERVER_IP;
const port = process.env.PORT;

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
                ori: serverIP + ':' + port,
                new: serverIP + ':' + port,
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
                        ori: serverIP + ':' + port,
                        new: serverIP + ':' + port,
                        lastActive: new Date().toUTCString()
                    })
                        .then(res => console.log(res)); 
                });
        })
        .catch(error => {throw error;});
}

resetDatabase();