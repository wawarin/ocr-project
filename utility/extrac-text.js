difflib = require('difflib');

class Validiation {
    constructor(data) {

        this.data = data;
        this.low = this.data.toLowerCase();
        this.str = this.low.split("\n");
        this.collect = {};
        // this.i = 0;
    }
    callAllfn() {
        this.loopForindex();
        console.log(this.collect);
    }
    loopForindex() {
        for (let i in this.str) {
            // console.log(this.str[i]);
            // console.log(".................");
            // this.webValid(this.str[i]);
            this.looppppp(this.str[i]);
            this.mailValid(this.str[i]);
            // this.predicWord(this.str[i]);
            // this.nameValid(this.str[i]);
            // this.findGetclose();

        }
    }
    differCheck(val1, val2) {
        var ratiocheck = new difflib.SequenceMatcher(null, val1, val2);
        return ratiocheck.ratio();
    }
    // findGetclose(checker, data) {
    //     difflib.getCloseMatches(checker, data);
    // }
    looppppp(word) {
        var test = word.split(" ");
        
        // console.log(test);
        for (let i in test) {
            // console.log(test[i]);
            this.nameValid(test[i]);
            // console.log("AAAAAAAAAAAAAAAAAAAAAAAAA");
            
        }
    }
    nameValid(word) {
        var sym = /[-_.]/;
        // var ratiocheck = new difflib.SequenceMatcher(null, "john", "john");
        var splstr, splstr1, i, teststr;
        // teststr = word.split(" ");
        // console.log(word);
        if (this.collect.email != null) {
            splstr = this.collect.email.split("@");
            // console.log(splstr[0]);
            if (sym.exec(splstr[0]) != null) {
                splstr1 = splstr[0].split(sym.exec(splstr[0]));
                console.log(splstr1);
                // console.log(this.differCheck('smlth', splstr1[i]));
                // console.log(this.str[i].split(" "));
                // console.log(splstr1[1]);
                // console.log(teststr);
                // console.log(word);
                
                for (i in splstr1) {
                    // console.log(difflib.getCloseMatches(splstr1[i], word));
                    // teststr = difflib.getCloseMatches(splstr[1], this.str[1].split(" "));
                    // console.log(word);
                    // console.log(difflib.getCloseMatches(splstr1[i], word));
                    
                    if (this.differCheck(word, splstr1[i]) > 0.4) {
                        console.log(word);
                        console.log(splstr1[i] + i);
                    }
                }
            }
        }
    }
    mailValid(word) {
        // var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // this.loopForindex();
        var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
        // var mailformat = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/igm;
        // var mailformat = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
        if (word.match(mailformat)) {
            // console.log("this email: " + word);
            this.collect.email = word;
        }

    }
    webValid(word) {
        var urlformat = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
        if (word.match(urlformat)) {
            // console.log("this website: " + this.str[this.i]);
            this.collect.link = word;
        }
    }
    // numberValid() {
    //     // var phoneformat = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    //     // var format = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    //     var format = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;
    //     // format1 = /[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*/g;
    //     var number = [];
    //     var result = format1.exec(this.str[this.i]);
    //     // var test = '+7 (495) 783 3700';
    //     if (this.str[this.i].match(format)) {
    //         // console.log('This Number: ' + result);
    //         console.log("this number: " + this.str[this.i]);
    //         // number.push(this.str[this.i]);
    //         // // console.log("this number: " + this.str[this.i]);
    //         // console.log(number);
    //     }
    // }
    predicWord(word) {
        var formatnumber = /[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*/g;
        var predicphone = /(tel|t\B\b|Tel|TEL|T\B\b)+/g;
        var mainpre = /(off|office|OFFICE|Office|O\B\b|o\B\b)+/g;
        var directpre = /(Direct|Dir|Direct Dial|Dial|Main|D\B\b|toll free|direct|Phone)+/g;
        var faxpre = /(Fax|F\B\b|fax|f\B\b)+/g;
        var onlyno = formatnumber.exec(word);
        // console.log(onlyno);
        if (word.match(predicphone) || word.match(mainpre) || word.match(formatnumber)) {
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
