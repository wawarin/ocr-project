difflib = require('difflib');

class Validiation {
    constructor(data) {

        this.data = data;
        this.low = this.data.toLowerCase();
        this.str = this.low.split("\n");
        this.collect = {};
        this.stringname;
        this.splitdata = [];
    }
    callAllfn() {
        this.loopForindex();
        this.nameValid();
        console.log(this.collect);
    }
    loopForindex() {
        for (let i in this.str) {
            
            // console.log(this.str[i]);
            // console.log(".................");
            this.webValid(this.str[i]);
            this.mailValid(this.str[i]);
            this.splitSpace(this.str[i]);
            this.numberValid(this.str[i]);
            // this.findGetclose();
            
        }
    }
    differCheck(val1, val2) {
        var ratiocheck = new difflib.SequenceMatcher(null, val1, val2);
        return ratiocheck.ratio();
    }
    findGetclose(checker, data) {
        difflib.getCloseMatches(checker, data);
    }
    splitSpace(word) {
        var test = word.split(" ");
        for (let i in test){
            this.splitdata.push(test[i]);
        }
        // console.log(this.splitdata);
    }
    predicName() {
        var symbol = /[-_.]/;
        var str
        if (this.collect.email != null) {
            str = this.collect.email.split("@");
            if (symbol.exec(str[0]) != null) {
                this.stringname = str[0].split(symbol.exec(str[0]));
            }
        }
    }
    nameValid() {
        var data = []
        console.log(this.splitdata);
        this.predicName();
        if (this.stringname != null && this.splitdata != null) {
            for (let i in this.stringname) {
                for (let k in this.splitdata) {
                    if (this.differCheck(this.stringname[i], this.splitdata[k]) > 0.4){
                        data.push(this.splitdata[k]); 
                        // console.log(this.stringname[i] + "-----------" + i);
                        // console.log(this.splitdata[k] + "-----------" + k);
                    }
                }
            }
            this.collect.name = data[0] + " " + data[1];
        }
    }
    mailValid(word) {
        // var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // this.loopForindex();
        var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
        // var mailformat = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/igm;
        // var mailformat = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
        if (word.match(mailformat)) {
            this.collect.email = word;
            // if (this.collect.email != null) {
            //     splstr = this.collect.email.split("@");
            //     if (symbol.exec(splstr[0]) != null) {
            //         this.stringname = splstr[0].split(symbol.exec(splstr[0]));
            //     }
            // }
        }


    }
    webValid(word) {
        var urlformat = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
        if (word.match(urlformat)) {
            // console.log("this website: " + this.str[this.i]);
            this.collect.link = word;
        }
    }
    numberValid(word) {
        var formatnumber = /[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*/g;
        var predicphone = /(tel|t\B\b|Tel|TEL|T\B\b)+/g;
        var mainpre = /(off|office|OFFICE|Office|O\B\b|o\B\b)+/g;
        var directpre = /(Direct|Dir|Direct Dial|Dial|Main|D\B\b|toll free|direct|Phone)+/g;
        var faxpre = /(Fax|F\B\b|fax|f\B\b)+/g;
        var onlyno = formatnumber.exec(word);
        // console.log(onlyno);
        if (word.match(predicphone) || word.match(mainpre)) {
            if (onlyno != null) {
                this.collect.phone = onlyno[0];
            }
        } else if (word.match(directpre)) {
            if (onlyno != null) {
                this.collect.direct = onlyno[0];
            };
        } else if (word.match(faxpre)) {
            if (onlyno != null) {
                this.collect.fax = onlyno[0];
            }
        }
    }

};
module.exports = {
    ext: Validiation
};
