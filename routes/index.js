let express = require('express');
let router = express.Router();
let multer = require('multer');
let mongoose = require('mongoose');
const createmodel = require("../utility/model.js");
const connect_db = require("../utility/db.js");
const extract = require("../utility/extrac-text.js");
// const previewtext = require("../public/javascripts/preview-text.js")
const { createWorker } = require('tesseract.js');
let card = mongoose.model("card", createmodel);

let diskstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images"); // here we specify the destination . in this case i specified the current directory
  },
  filename: function (req, file, cb) {
    // console.log("This console log" + file);
    cb(null, file.originalname);// here we specify the file saving name . in this case i specified the original file name
  },
});

let upload = multer({
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
  connect_db;  
  res.render('index');

});

router.post('/test', upload.single("image"), function (req, res, next) {
  let image = "./public/images/" + req.file.originalname;
  // console.log(image);
  const worker = createWorker({
    logger: m => console.log(m), // Add logger here
  });
  
  (async () => {
    await worker.load();
    await worker.loadLanguage('eng+tha');
    await worker.initialize('eng+tha');
    const { data: { text } } = await worker.recognize(image);
    // console.log(text);
    // console.log(text.split("\n"));
    let valid = new extract.ext(text);
    console.log(valid.callAllfn());
    await worker.terminate();
    // res.json({ message: "Upload Complete!!!" });
    res.json(valid.callAllfn());
  })();
});

router.post('/saved', function(req, res, next) {
  // let card = mongoose.model("card", )
  console.log(req.body);
  var myData = new card(req.body);
  myData.save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
  // res.json({message: item}); 
})


module.exports = router;
