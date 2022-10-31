const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/users'));
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniquePrefix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage, limits: { fileSize: 1000000 } });

module.exports = upload;
