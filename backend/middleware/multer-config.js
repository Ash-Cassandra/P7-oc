const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const { createBook } = require('../controllers/book');


const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'image/');
    },
    //renommer l'image
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_').split('.')[0];
         const extension = MIME_TYPES[file.mimetype];
        callback(null,  name + '_' + Date.now() + '.' + extension);
    }
});

const upload = multer({ storage });

module.exports = {
  functionSharp: (req, res, next) => {
    upload.single('image')(req, res, function(err) {
      if (err) {
        return res.status(400).json({err});
      }
       // Vérifier si aucune image n'a été téléchargée
       if (!req.file && req.method === 'POST') {
        return res.status(400).json({ error: 'Veuillez fournir une image' });
      }
      if (!req.file && req.method === 'PUT') {
        console.log(req.method);
        return next();
      }
      // Utiliser Sharp pour redimensionner l'image
      sharp(req.file.path)
        .resize(900)
        .webp()
        .toFile(req.file.path.split('.')[0] + '.webp')
        .then(function(info) {
          // Supprimer le fichier d'origine
          fs.unlink(req.file.path, function(err) {
            if (err) {
              console.error({err});
            }
            next();
          });
        })
        .catch(function(err) {
          console.log(err);
          return res.status(500).json({ err});
        });
    });
  }
};