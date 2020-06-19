let mongoose = require('mongoose');
const moment = require('moment-timezone');

class Model{
    constructor(){
        this.dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
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
            Date: { type: Date, default: this.dateThailand}
        })
        return schema;
    }
}
module.exports = new Model();