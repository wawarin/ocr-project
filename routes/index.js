var express = require('express');
var router = express.Router();
var multer = require('multer');
const extract = require("../utility/extrac-text.js");
const { createWorker } = require('tesseract.js');


var diskstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images"); // here we specify the destination . in this case i specified the current directory
  },
  filename: function (req, file, cb) {
    // console.log("This console log" + file);
    cb(null, file.originalname);// here we specify the file saving name . in this case i specified the original file name
  },
});

var upload = multer({
  storage: diskstorage,
  /*File Filter*/
  fileFilter: (req, file, cb) => { // มีบัคที่ไฟล์ tiff ไม่แสดงหน้าเว็ป
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/tiff") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg .tif format allowed!'));
    }
  }
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');

});

router.post('/test', upload.single("image"), function (req, res, next) {
  var image = "./public/images/" + req.file.originalname;
  console.log(image);
  const worker = createWorker({
    logger: m => console.log(m), // Add logger here
  });

  (async () => {
    await worker.load();
    await worker.loadLanguage('eng+tha');
    await worker.initialize('eng+tha');
    const { data: { text } } = await worker.recognize(image);
    console.log(text);
    console.log(text.split("\n"));
    let valid = new extract.ext(text);
    valid.callAllfn();

    await worker.terminate();
  })();
  res.json({ data: valid.callAllfn()});
});


module.exports = router;
