const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
const router = express.Router();

const bookCtrl =  require('../controllers/books');

router.post('/', auth, multer, bookCtrl.createBook);
router.put('/:id', auth, multer, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.get('/', bookCtrl.findAllBook);
router.post('/:id/rating', auth, bookCtrl.createRating);
router.get('/:id', bookCtrl.findOneBook);


module.exports = router;