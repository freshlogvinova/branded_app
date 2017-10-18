const multer = require('multer');

// for upload files
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '_' + file.originalname);
  }
});
const upload = multer({storage: storage}).single('file');

module.exports = upload;