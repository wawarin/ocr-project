let mongoose = require('mongoose');
class Model{
    constructor(){
        this._schema()
    }
    _schema(){
        let schema = new mongoose.Schema({
            Name: String,
            CompanyName: String,
            Position: String,
            Number: String,
            Address: String,
            Mail: String,
            Web: String,
            Other: String,
            Date: { type: Date, default: Date.now }
        })
        return schema;
    }
}
module.exports = new Model();