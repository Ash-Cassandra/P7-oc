const multer = require('multer');
const { createBook } = require('../controllers/book');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'image')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + '_' + Date.now() + '.' + extension);
    }
});

module.exports= multer({ storage }).single('image'), createBook;