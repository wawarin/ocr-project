difflib = require('difflib');

class Validiation {
    constructor(data) {

        this.data = data;
        this.low = this.data.toLowerCase();
        this.str = this.low.split("\n");
        this.collect = {};
        this.stringname = [];
        this.splitdata = [];
    }
    callAllfn() {
        this.loopForindex();
        this.nameValid();
        return this.collect;
    }
    loopForindex() {
        for (let i in this.str) {
            this.webValid(this.str[i]);
            this.mailValid(this.str[i]);
            this.splitSpace(this.str[i]);
            this.numberValid(this.str[i]);

        }
    }
    differCheck(val1, val2) {
        let ratiocheck = new difflib.SequenceMatcher(null, val1, val2);
        return ratiocheck.ratio();
    }
    findGetclose(checker, data) {
        difflib.getCloseMatches(checker, data);
    }
    splitSpace(word) {
        let test = word.split(" ");
        for (let i in test) {
            this.splitdata.push(test[i]);
        }
    }
    predicName() {
        let symbol = /[-_.]/;
        let str
        if (this.collect.email != null) {
            str = this.collect.email.split("@");
            if (symbol.exec(str[0]) != null) {
                this.stringname = str[0].split(symbol.exec(str[0]));
            } else {
                this.stringname = str[0];
            }
        }
        else {
            return false
        }
    }
    nameValid() {
        let data = [];
        if (this.predicName()) {
            if (this.stringname != null && this.stringname.length <= 2 && this.splitdata != null) {
                for (let k in this.splitdata) {
                    for (let i in this.stringname) {
                        if (this.differCheck(this.stringname[i], this.splitdata[k]) > 0.4) {
                            data.push(this.splitdata[k]);
                        }
                    }
                }
                this.collect.name = data[0] + " " + data[1];
            } else if (this.stringname != null && this.stringname.length > 2 && this.splitdata != null) {
                for (let k in this.splitdata) {
                    if (this.differCheck(this.stringname, this.splitdata[k]) > 0.4) {
                        data.push(this.splitdata[k]);
                    }
                }
                this.collect.name = data[0];
            }
        } else {
            console.log("No email for find name!!");
        }
    }
    mailValid(word) {
        // let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // this.loopForindex();
        let mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
        // let mailformat = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/igm;
        // let mailformat = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
        if (word.match(mailformat)) {
            this.collect.email = word;
        }


    }
    webValid(word) {
        let urlformat = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
        if (word.match(urlformat)) {
            // console.log("this website: " + this.str[this.i]);
            this.collect.link = word;
        }
    }
    numberValid(word) {
        let formatnumber = /[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*/g;
        // let formatnumber = /^(([\+]{1}[0-9]{1,3}[\ ]{1}[0-9]{1,2}[\ ]{1}[0-9]{4}[\ ]{1}[0-9]{4})|([0]{1}[0-9]{1}[\ ]{1}[0-9]{4}[\ ]{1}[0-9]{4})|([0]{1}[0-9]{1}[\-]{1}[0-9]{4}[\-]{1}[0-9]{4})|([\(]{1}[0]{1}[0-9]{1}[\)]{1}[\ ]{1}[0-9]{4}([\ ]|[\-]){1}[0-9]{4})|([0-9]{4}([\ ]|[\-])?[0-9]{4})|([0]{1}[0-9]{3}[\ ]{1}[0-9]{3}[\ ]{1}[0-9]{3})|([0]{1}[0-9]{9})|([\(]{1}[0-9]{3}[\)]{1}[\ ]{1}[0-9]{3}[\-]{1}[0-9]{4})|([0-9]{3}([\/]|[\-]){1}[0-9]{3}[\-]{1}[0-9]{4})|([1]{1}[\-]?[0-9]{3}([\/]|[\-]){1}[0-9]{3}[\-]{1}[0-9]{4})|([1]{1}[0-9]{9}[0-9]?)|([0-9]{3}[\.]{1}[0-9]{3}[\.]{1}[0-9]{4})|([\(]{1}[0-9]{3}[\)]{1}[0-9]{3}([\.]|[\-]){1}[0-9]{4}(([\ ]?(x|ext|extension)?)([\ ]?[0-9]{3,4}))?)|([1]{1}[\(]{1}[0-9]{3}[\)]{1}[0-9]{3}([\-]){1}[0-9]{4})|([\+]{1}[1]{1}[\ ]{1}[0-9]{3}[\.]{1}[0-9]{3}[\-]{1}[0-9]{4})|([\+]{1}[1]{1}[\ ]?[\(]{1}[0-9]{3}[\)]{1}[0-9]{3}[\-]{1}[0-9]{4}))$/g;
        let predicphone = /(tel|t\B\b|Tel|TEL|T\B\b)+/g;
        let mainpre = /(off|office|OFFICE|Office|O\B\b|o\B\b)+/g;
        let directpre = /(Direct|Dir|Direct Dial|Dial|Main|D\B\b|toll free|direct|Phone)+/g;
        let faxpre = /(Fax|F\B\b|fax|f\B\b)+/g;
        let onlyno = formatnumber.exec(word);
        if (word.match(predicphone) || word.match(mainpre)) {
            if (onlyno != null) {
                this.collect.number = onlyno[0];
            }
        } else if (word.match(directpre)) {
            if (onlyno != null) {
                this.collect.number = onlyno[0];
            };
        } else if (word.match(faxpre)) {
            if (onlyno != null) {
                this.collect.fax = onlyno[0];
            }
        } else if (word.match(formatnumber)) {
            if (onlyno[0].length > 5) {
                this.collect.number = onlyno[0];
            }
        }
    }

};
module.exports = {
    ext: Validiation
};
