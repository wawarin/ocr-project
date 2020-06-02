//Import the mongoose module
let mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://admin:admin556@cluster0-thyaj.mongodb.net/test?retryWrites=true&w=majority';

class Database {
    constructor(){
        this._connect()
    }

    _connect(){
        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => {
                console.log('Database connection successful');
            })
            .catch(err => {
                console.error('Database connection error');
            })
    }
}
module.exports = new Database();