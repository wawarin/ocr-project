difflib = require('difflib');

class Validiation {
    constructor(data) {

        this.data = data;
        this.low = this.data.toLowerCase();
        this.str = this.low.split("\n");
        this.collect = {};
        this.i = 0;
    }
    callAllfn() {
        this.loopForindex();


        // this.nameValid();
        console.log(this.collect);
    }
    loopForindex() {
        for (this.i in this.str) {
            // return this.str[this.i];
            console.log(this.str[this.i]);
            console.log(".................");
            // this.webValid();
            // this.predicWord();
            // this.mailValid();
            // this.nameValid();
            // this.findGetclose();
            // this.looppppp();
        }
    }
    differCheck(val1, val2) {
        var ratiocheck = new difflib.SequenceMatcher(null, val1, val2);
        return ratiocheck.ratio();
    }
    // findGetclose(checker , data) {
    //     difflib.getCloseMatches(checker, data.split(" "));
    // }
    // looppppp() {
    //     var test = this.str[this.i].split(" ");

    //     for (this.i in test){
    //         console.log(test[this.i]);
    //         console.log("AAAAAAAAAAAAAAAAAAAAAAAAA");
    //     }
    // }
    nameValid() {
        var sym = /[-_.]/;
        // var ratiocheck = new difflib.SequenceMatcher(null, "john", "john");
        var splstr, splstr1, i, teststr;
        if (this.collect.email != null) {
            splstr = this.collect.email.split("@");
            // console.log(splstr[0]);
            if (sym.exec(splstr[0]) != null) {
                splstr1 = splstr[0].split(sym.exec(splstr[0]));
                // console.log(splstr1);
                // console.log(this.differCheck('smlth', splstr1[1]));
                // console.log(this.str[i].split(" "));
                // console.log(splstr1[1]);
                teststr = this.str[this.i].split(" ");
                console.log(teststr);
                for (i in splstr1) {
                    // console.log(this.findGetclose(splstr1[i], this.str[this.i]));
                    // teststr = difflib.getCloseMatches(splstr[1], this.str[1].split(" "));
                    // console.log(teststr + i);
                    // if (this.differCheck(this.str[1].split(" "), splstr1[i]) > 0.4) {

                    //     console.log(splstr1[i] + i);
                    // }
                }
            }
        }
    }
    mailValid() {
        // var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // this.loopForindex();
        var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
        // var mailformat = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/igm;
        // var mailformat = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
        if (this.loopForindex().match(mailformat)) {
            console.log("this email: " + this.str[this.i]);
            this.collect.email = this.str[this.i];
        }

    }
    webValid() {
        var urlformat = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
        if (this.str[this.i].match(urlformat)) {
            // console.log("this website: " + this.str[this.i]);
            this.collect.link = this.str[this.i];
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
    predicWord() {
        var formatnumber = /[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*/g;
        var predicphone = /(tel|t\B\b|Tel|TEL|T\B\b)+/g;
        var mainpre = /(off|office|OFFICE|Office|O\B\b|o\B\b)+/g;
        var directpre = /(Direct|Dir|Direct Dial|Dial|Main|D\B\b|toll free|direct|Phone)+/g;
        var faxpre = /(Fax|F\B\b|fax|f\B\b)+/g;
        var onlyno = formatnumber.exec(this.str[this.i]);
        // console.log(onlyno);
        if (this.str[this.i].match(predicphone) || this.str[this.i].match(mainpre)) {
            if (onlyno != null) {
                this.collect.phone = onlyno[0];
            }
        } else if (this.str[this.i].match(directpre)) {
            if (onlyno != null) {
                this.collect.direct = onlyno[0];
            };
        } else if (this.str[this.i].match(faxpre)) {
            if (onlyno != null) {
                this.collect.fax = onlyno[0];
            }
        }
    }
    
};
module.exports = {
    ext: Validiation
};
