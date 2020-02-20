var mongoose = require('mongoose');
const config = require('../config');
const dbUri = config.dbUri;

module.exports.connect = () => {

    mongoose.connect(dbUri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true 
    });

    mongoose.Promise = global.Promise;
    var db = mongoose.connection;

    db.on('error', (err) => {
        //on Error emit error type/description
        console.error(`Mongoose connection error: ${err}`);
        console.error.bind(console, 'MongoDB connection error:')
    });

    db.once('open', function () {
        // we're connected!
        console.info('\x1b[33m%s\x1b[0m', 'Connection opened succesfully to: ' + dbUri);  //yellow
    });

    //Load Models
    require('./user');
    require('./restaurant');
}