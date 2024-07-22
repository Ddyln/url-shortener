
const connectToDatabase = async () => {
    var mongoose = require('mongoose');
    //Lets connect to our database using the DB server URL.
    mongoose.connect('mongodb+srv://user:abcd1234@cluster-mongo-test.ueql9iv.mongodb.net/url-shortener?retryWrites=true&w=majority&appName=cluster-mongo-test')
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

connectToDatabase();