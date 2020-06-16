/*  ==========================================
    SHOW UPLOADED IMAGE
* ========================================== */
$('table').hide();
$('#showdata').hide();
$('#obj').hide();
$('#load').hide();

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#imageResult')
        .attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

// This function for check about data from OCR result and mange to show data in input box
function previewData(data) {
  if (data != null) {
    for (let [key, value] of Object.entries(data)) {
      if ([key] == "name" && [value] != null) {
        if ([value] != 'undefined undefined') {
          $('#fname').prop('value', [value]);
        } else {
          $('#fname').prop('value', "please select or typing Name");
        }

      }
      else if ([key] == "number") {
        if ([value] != null) {
          $('#num').prop('value', [value]);
        } else {
          $('#num').prop('value', 'please select or typing Phone number');
        }
      }
      else if ([key] == "address") {
        if ([value] != null) {
          $('#add').prop('value', [value]);
        } else {
          $('#add').prop('value', 'please select or typing Address');
        }
      }
      else if ([key] == "email") {
        if ([value] != null) {
          $('#mail').prop('value', [value]);
        } else {
          $('#mail').prop('value', 'please select or typing Email');
        }
      }
      else if ([key] == "other") {
        if ([value] != null) {
          $('#oth').prop('value', [value]);
        } else {
          $('#oth').prop('value', 'please select or typing Other')
        }
      }
      else if ([key] == "alldata" && [value] != null) {
        let str_one = ""
        for (let i in [value]) {
          str_one += [value][i] + " ";
        }
        $('#alldata').text(str_one);
      }
      else if ([key] == "ogdata" && [value] != null) {
        let table = new taBle([value][0]);
        console.log(table);
      }
    }
  }
  $('table').show();
  $('#showdata').show();
  $('#obj').hide();
  $('#load').hide();
}

// Class for insert data to table in web ui
class taBle {
  constructor(data) {
    this.test = data.split("\n");
    this.collectdata = [];
    this._tableData(this.test);
    this._filterData();
    this._putData();
  }

  // The function of separating words with word groups.
  _tableData(data) {
    for (let i in data) {
      this._findnumber(data[i]);
      if (data[i].split(" ").length == 1) {
        this.collectdata.push(data[i]);
      }
    }
  }

  // Function about find phone number and separate prefix
  _findnumber(word) {
    let formatnumber = /[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*/g;
    // let formatnumber = /^(([\+]{1}[0-9]{1,3}[\ ]{1}[0-9]{1,2}[\ ]{1}[0-9]{4}[\ ]{1}[0-9]{4})|([0]{1}[0-9]{1}[\ ]{1}[0-9]{4}[\ ]{1}[0-9]{4})|([0]{1}[0-9]{1}[\-]{1}[0-9]{4}[\-]{1}[0-9]{4})|([\(]{1}[0]{1}[0-9]{1}[\)]{1}[\ ]{1}[0-9]{4}([\ ]|[\-]){1}[0-9]{4})|([0-9]{4}([\ ]|[\-])?[0-9]{4})|([0]{1}[0-9]{3}[\ ]{1}[0-9]{3}[\ ]{1}[0-9]{3})|([0]{1}[0-9]{9})|([\(]{1}[0-9]{3}[\)]{1}[\ ]{1}[0-9]{3}[\-]{1}[0-9]{4})|([0-9]{3}([\/]|[\-]){1}[0-9]{3}[\-]{1}[0-9]{4})|([1]{1}[\-]?[0-9]{3}([\/]|[\-]){1}[0-9]{3}[\-]{1}[0-9]{4})|([1]{1}[0-9]{9}[0-9]?)|([0-9]{3}[\.]{1}[0-9]{3}[\.]{1}[0-9]{4})|([\(]{1}[0-9]{3}[\)]{1}[0-9]{3}([\.]|[\-]){1}[0-9]{4}(([\ ]?(x|ext|extension)?)([\ ]?[0-9]{3,4}))?)|([1]{1}[\(]{1}[0-9]{3}[\)]{1}[0-9]{3}([\-]){1}[0-9]{4})|([\+]{1}[1]{1}[\ ]{1}[0-9]{3}[\.]{1}[0-9]{3}[\-]{1}[0-9]{4})|([\+]{1}[1]{1}[\ ]?[\(]{1}[0-9]{3}[\)]{1}[0-9]{3}[\-]{1}[0-9]{4}))$/g;
    let predicphone = /(tel|t\B\b|Tel|TEL|T\B\b)+/g;
    let mainpre = /(off|office|OFFICE|Office|O\B\b|o\B\b)+/g;
    let directpre = /(Direct|Dir|Direct Dial|Dial|Main|D\B\b|toll free|direct|Phone)+/g;
    let faxpre = /(Fax|F\B\b|fax|f\B\b)+/g;
    let onlyno = formatnumber.exec(word);
    if (word.match(predicphone) || word.match(mainpre) || word.match(directpre) || word.match(faxpre) ||
      word.match(formatnumber)) {
      if (onlyno != null && onlyno[0].length >= 9) {
        this.test = this.test.filter(e => e != word);
        this.collectdata.push(onlyno[0])
      }
    }
  }

  //  The function for filter data betaween collectdata and test for find remaining array
  _filterData() {
    let left_spitdata = [];
    if (this.collectdata != null || this.collectdata != []) {
      for (let i in this.collectdata) {
        this.test = this.test.filter(e => e != this.collectdata[i])
      }
      for (let k in this.test) {
        left_spitdata.push(this.test[k].split(" "));
      }
      for (let j in left_spitdata) {
        for (let m in left_spitdata[j]) {
          this.collectdata.push(left_spitdata[j][m]);
          this.collectdata = this.collectdata.filter(e => e != "");
        }
      }
    }
  }
  // The function for insert about data in collectdata array to table in html
  _putData() {
    let num = 1; // this variable for show the sequence label on checkbox
    if (this.collectdata != [] || this.collectdata != null) {
      for (let i in this.collectdata) {
        $('#tabledata').find('tbody').append(
          "<tr>" +
          "<th scope=\"row\">" +
          "<div class=\"custom-control custom-checkbox\">" +
          "<input type=\"checkbox\" class=\"custom-control-input\"" + "id=" + "check" + i + ">" +
          "<label class=\"custom-control-label\"" + "for=" + "check" + i + ">" + num + "</label>" +
          "</div>" +
          "</th>" +
          "<td " + "id= " + "tdid" + i + ">" + this.collectdata[i] + "</td>" +
          "</tr>"
        );
        num = num + 1;
      }
    }
  }
  // The function for return data for use next
  sendData() {
    if (this.collectdata != null) {
      return this.collectdata;
    }
  }
}

$(function () {
  $('#upload').on('change', function () {
    $('#alldata').hide();
    $('table').hide();
    $('#showdata').hide();

    // show loading
    $('#load').show();
    $('#obj').show();

    readURL(input);

    $('#tabledata').find('tbody').empty(); // clear data in table body
  });
});

/*  ==========================================
    SHOW UPLOADED IMAGE NAME
* ========================================== */
var input = document.getElementById('upload');
var infoArea = document.getElementById('upload-label');

input.addEventListener('change', showFileName);


function showFileName(event) {

  var input = event.srcElement;
  var file = input.files[0].name;

  infoArea.textContent = 'File name: ' + file;

  const formData = new FormData() // ข้อมูลเป็นไฟล์ เอาใส่ FormData แบบนี้ ปล.ไม่ต้องเป็น file ก็ส่งแบบนี้ได้
  formData.append('image', input.files[0]) // เอาไฟล์ยัดใส่ FormData ใช้ชื่อ Field ว่า "image"


  // ปกติถ้าไม่ได้ส่ง file จะส่งเป็น json แบบนี้
  // const formData = { fileName: "Wa", message: "wawawa" } 

  $.ajax({
    url: '/test',
    type: 'post',
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      previewData(data);
      // tableData();
      // console.log(data);
    },
    error: function (err) {
      console.log('error: ', err);
    }
  });
}

// This class for format about data before send to frontend and save to the database
class madeData {
  constructor() {
    this.data = {};
    this._nameData();
    this._companyData();
    this._positionData();
    this._numberData();
    this._addressData();
    this._mailData();
    this._otherData();
  }
  _returnData() {
    return this.data
  }

  _nameData() {
    let name = $('#fname').val();
    if (name != null) {
      this.data.Name = name;
    } else if (name == "") {
      this.data.Name = null;
    }
  }
  _companyData() {
    let comname = $('#coname').val();
    if (comname != null) {
      this.data.CompanyName = comname;
    } else if (name == "") {
      this.data.CompanyName = null;
    }
  }
  _positionData() {
    let pos = $('#pos').val();
    if (pos != null) {
      this.data.Position = pos;
    } else if (pos == "") {
      this.data.Position = null;
    }
  }
  _numberData() {
    let number = $('#num').val();
    if (number != null) {
      this.data.Number = number;
    } else if (number == "") {
      this.data.Number = null;
    }
  }
  _addressData() {
    let addr = $('#add').val();
    if (addr != null) {
      this.data.Address = addr;
    } else if (addr == "") {
      this.data.Address = null;
    }
  }
  _mailData() {
    let mail = $('#mail').val();
    if (mail != null) {
      this.data.Mail = mail;
    } else if (mail == "") {
      this.data.Mail = null;
    }
  }
  _otherData() {
    let oth = $('#oth').val();
    if (oth != null) {
      this.data.Other = oth;
    } else if (oth == "") {
      this.data.Other = null;
    }
  }
}

// Save to the database
$('#submit').click(function () {

  let data = new madeData();
  console.log(data._returnData());

  const formData = new FormData() // ข้อมูลเป็นไฟล์ เอาใส่ FormData แบบนี้ ปล.ไม่ต้องเป็น file ก็ส่งแบบนี้ได้
  formData.append('data', data._returnData()) // เอาไฟล์ยัดใส่ FormData ใช้ชื่อ Field ว่า "image"


  // ปกติถ้าไม่ได้ส่ง file จะส่งเป็น json แบบนี้
  // const formData = { fileName: "Wa", message: "wawawa" } 

  $.ajax({
    url: '/saved',
    type: 'post',
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      console.log(data);
      alert("Data saved!!!");
    },
    error: function (err) {
      console.log('error: ', err);
    }
  });
});

//  Save to database and send email
$('#subandsend').click(function () {

  let data = new madeData();
  console.log(data._returnData());

  const formData = new FormData() // ข้อมูลเป็นไฟล์ เอาใส่ FormData แบบนี้ ปล.ไม่ต้องเป็น file ก็ส่งแบบนี้ได้
  formData.append('data', data._returnData()) // เอาไฟล์ยัดใส่ FormData ใช้ชื่อ Field ว่า "image"


  // ปกติถ้าไม่ได้ส่ง file จะส่งเป็น json แบบนี้
  // const formData = { fileName: "Wa", message: "wawawa" } 

  $.ajax({
    url: '/saved',
    type: 'post',
    data: formData,
    processData: false,
    contentType: false,
    success: function () {
      emailSent(data._returnData());
    },
    error: function (err) {
      console.log('error: ', err);
    }
  });
});

function emailSent(data) {
  if (data.Mail != null) {
    if (data.Name != null) {
      Email.send({
        SecureToken: "4d812d49-2fd5-46b4-b4fd-81f7c2b6a42a",
        To: data.Mail,
        From: "s5901012630121@email.kmutnb.ac.th",
        Subject: "Dear " + data.Name,
        Body: "Dear " + data.Name + " Following your contact, it is with great delight that we can work in cooperation with you. We are looking forward to carrying out bussiness together with you." + "Yours sincerely" + "Warinthorn Rattanakarunjit"
      }).then(function (message) {
        alert("Mail sent successfully!!")
      });
    }
  } 
  else {
    alert("Can not send Email. Please check or typing email");
  }
}

/*==============
= Clear button =
================*/
$('#cl_name').click(function () {
  $('#fname').val("");
});

$('#cl_coname').click(function () {
  $('#coname').val("");
});

$('#cl_pos').click(function () {
  $('#pos').val("");
});

$('#cl_num').click(function () {
  $('#num').val("");
});

$('#cl_addr').click(function () {
  $('#add').val("");
});

$('#cl_mail').click(function () {
  $('#mail').val("");
});

$('#cl_oth').click(function () {
  $('#oth').val("");
});

// The function for check checkbox values and get values from that cell in table
function setData() {
  let str = []
  let countrow = $('#tabledata td').closest("tr").length;
  let range = Array.from(Array(countrow).keys());
  console.log(typeof countrow);
  console.log(range);
  for (let i in range){
    if ($('#check' + i).is(":checked")) {
      console.log(i);
      console.log($('#tdid' + i).text());
      str.push($('#tdid' + i).text());
    }
  }
  console.log(str);
  return str.join(" ");
}

/*==============
= Submit button =
================*/
$('#sub_name').click(function() {
  $('#fname').prop('value', setData());
});

$('#sub_coname').click(function() {
  $('#coname').prop('value', setData());
});

$('#sub_pos').click(function() {
  $('#pos').prop('value', setData());
});

$('#sub_num').click(function() {
  $('#num').prop('value', setData());
});

$('#sub_addr').click(function() {
  $('#add').prop('value', setData());
});

$('#sub_mail').click(function() {
  $('#mail').prop('value', setData());
});

$('#sub_oth').click(function() {
  $('#oth').prop('value', setData());
});