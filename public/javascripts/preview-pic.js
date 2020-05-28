/*  ==========================================
    SHOW UPLOADED IMAGE
* ========================================== */
$('#showdata').hide();
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


$(function () {
  $('#upload').on('change', function () {
    readURL(input);
    $('#showdata').show();
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
      console.log('success');
      // console.log("This file " + file);
      alert(data.message);
    },
    error: function (err) {
      console.log('error: ', err);
    }
  });
}


