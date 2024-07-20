const connectToDatabase = async () => {
    var mongoose = require('mongoose');

    //Lets connect to our database using the DB server URL.
    mongoose.connect('mongodb+srv://user:abcd1234@cluster-mongo-test.ueql9iv.mongodb.net/url-shortener?retryWrites=true&w=majority&appName=cluster-mongo-test')
        .then((result) => {
            console.log('Connected!');
            var link = mongoose.model('link', {
                ori: String,
                new: String
            });
            link.findOne({ori: 'localhost'})
                .then(result => {
                    if (!result) console.log('Not found!');
                    else console.log(result);
                })
                .catch(err => console.log(err));
        })
        .catch(error => console.log('Can\'t connect to DB!'));
}

connectToDatabase();