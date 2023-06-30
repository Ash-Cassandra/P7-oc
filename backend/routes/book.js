const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
const bookCtrl =  require('../controllers/book');
const router = express.Router();

router.get('/', bookCtrl.findAllBook);
router.post('/', auth, multer.functionSharp, bookCtrl.createBook);
router.get('/bestrating', bookCtrl.bestRating);
router.get('/:id', bookCtrl.findOneBook);
router.put('/:id', auth, multer.functionSharp, bookCtrl.modifyBook);
router.post('/:id/rating', auth, bookCtrl.createRating);
router.delete('/:id', auth, bookCtrl.deleteBook);


module.exports = router;