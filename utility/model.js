let mongoose = require('mongoose');
class Model{
    constructor(){
        this._schema()
    }
    _schema(){
        let schema = new mongoose.Schema({
            Name: String,
            // Lastname: String,
            Number: String,
            Address: String,
            Mail: String,
            Web: String,
            Other: [],
            Date: { type: Date, default: Date.now }
        })
        return schema;
        // const cardmodel = mongoose.model('BusinessCards', schema);
        // return cardmodel;
    }
    // matchdata(data){
    //     if (data != null) {
    //         for (let [key, value] of Object.entries(object1)) {
    //             // console.log(`${key}: ${value}`);
    //             if ([key] == "name" && [value] != null) {
                    
    //             }
    //           }
    //     }
    // }
}
module.exports = new Model();