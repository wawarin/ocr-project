/*  ==========================================
    SHOW UPLOADED IMAGE
* ========================================== */

// $('#showdata').hide();
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
function resetData() {
  $
}
function previewData(data) {
  if (data != null) {
    for (let [key, value] of Object.entries(data)) {
      // console.log(`${key}: ${value}`);
      if ([key] == "name" && [value] != null) {
        if ([value] != 'undefined undefined') {
          $('#fname').prop('value', [value]);
        } else {
          $('#fname').prop('value', "please select or typing First name");
        }

      }
      // else if ([key] == "lastname") {
      //   if ([value] != null) {
      //     $('#lname').prop('value', [value]);
      //   } else {
      //     $('#lname').prop('value', 'please select or typing Last name');
      //   }
      // }
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
          str_one = [value][i] + " ";
        }
        $('#alldata').text(str_one);
      }
    }
  }
  $('#showdata').show();
  $('#obj').hide();
  $('#load').hide();
}

$(function () {
  $('#upload').on('change', function () {
    $('#showdata').hide();
    $('#load').show();
    $('#obj').show();
    readURL(input);
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
      console.log(data);
    },
    error: function (err) {
      console.log('error: ', err);
    }
  });
}
class madeData {
  constructor() {
    this.data = {};
    this._nameData();
    this._lastnameData();
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
  // _lastnameData() {
  //   let lname = $('#lname').val();
  //   if (lname != "") {
  //     this.data.Lastname = lname;
  //   } else if (lname == "") {
  //     this.data.Lastname = null;
  //   }
  // }
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
    // let alldata = $('#alldata').val();
    // let allsplit = alldata.split(" ");
    let oth = $('#oth').val();
    if (oth != null) {
      this.data.Other = oth;
    } else if (oth == "") {
      this.data.Other = null;
    }
  }
}
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
      // console.log(data);
      emailSent(data._returnData());
      // alert(data._returnData());
    },
    error: function (err) {
      console.log('error: ', err);
    }
  });
});

function emailSent(data) {
  if (data.Mail != null) {
    if (data.Name != null && data.Lastname != null) {
      Email.send({
        SecureToken: "4d812d49-2fd5-46b4-b4fd-81f7c2b6a42a",
        To: data.Mail,
        From: "s5901012630121@email.kmutnb.ac.th",
        Subject: "Dear " + data.Name + " " + data.Lastname,
        Body: "Following your contact, it is with great delight that we can work in cooperation with you. We are looking forward to carrying out bussiness together with you."
      }).then(function (message) {
        alert("Mail sent successfully!!")
      });
    }
    else if (data.Name != null){
      Email.send({
        SecureToken: "4d812d49-2fd5-46b4-b4fd-81f7c2b6a42a",
        To: data.Mail,
        From: "s5901012630121@email.kmutnb.ac.th",
        Subject: "Dear " + data.Name,
        Body: "Following your contact, it is with great delight that we can work in cooperation with you. We are looking forward to carrying out bussiness together with you."
      }).then(function (message) {
        alert("Mail sent successfully!!")
      });
    }
    else {
      Email.send({
        SecureToken: "4d812d49-2fd5-46b4-b4fd-81f7c2b6a42a",
        To: data.Mail,
        From: "s5901012630121@email.kmutnb.ac.th",
        Subject: "Hi ",
        Body: "Following your contact, it is with great delight that we can work in cooperation with you. We are looking forward to carrying out bussiness together with you."
      }).then(function (message) {
        alert("Mail sent successfully!!")
      });
    }
  }
}

