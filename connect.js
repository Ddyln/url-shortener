var mongoose = require('mongoose');

const connectToDatabase = async () => {
    //Lets connect to our database using the DB server URL.
    mongoose.connect('mongodb+srv://user:abcd1234@cluster-mongo-test.ueql9iv.mongodb.net/url-shortener?retryWrites=true&w=majority&appName=cluster-mongo-test')
        .then((result) => {return mongoose;})
        .catch(error => {throw error;});
}

connectToDatabase();