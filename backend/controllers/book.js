const Book = require('../models/Book');
const fs = require('fs');



exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    let pathImage = req.file.path.split('.')[0] + '.webp';
    
        const book = new Book({
            ...bookObject,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/${pathImage.replace('\\', '/')}`
        });   
        
        book.save()
            .then(() => {
                res.status(201).json({ message: 'Livre enregistré' });
                next(); 
            })
            .catch(error => res.status(400).json({ error }));
    };


exports.createRating = (req, res, next) => {
    const userId = req.auth.userId;
    const grade = req.body.rating; 

    Book.findOne({ _id: req.params.id })
      .then(book => {
  
        const userRated = book.ratings.some(rating => rating.userId === userId);
        if (userRated) {
          return res.status(400).json({ error: "Vous avez déjà noté ce livre." });
        }
        
        const rating = {
          userId: userId,
          grade: grade
        };
        // ajout de la note au tableau
        book.ratings.push(rating); 
        book.averageRating = ((book.averageRating * (book.ratings.length - 1) + grade) / book.ratings.length).toFixed(1); /* calcul de la note moyenne*/
    console.log('grade', grade)
    console.log('average', book.averageRating)

        book
          .save()
          .then(updatedBook => {
            res.status(200).json(updatedBook);
            next();
            console.log('updatedBook', updatedBook);
          })
          .catch(error => res.status(400).json( {error} ));
      })
      .catch(error => res.status(400).json({ error }, "erreur livre" ));
  };
  

exports.bestRating = (req, res, next) => {
        Book.find()
            .sort({ averageRating: -1 }) 
            .limit(3)
            .then(books => res.status(200).json(books))
            .catch(error => res.status(400).json({ error }));
    }
    

    exports.modifyBook = (req, res, next) => {
      let pathImage = req.file ? req.file.path.split('.')[0] + '.webp' : null;
    
      const bookObject = req.file
        ? {
            ...JSON.parse(req.body.book),
            imageUrl: `${req.protocol}://${req.get('host')}/${pathImage.replace('\\', '/')}`
          }
        : { ...req.body };
    
      delete bookObject._userId;
    
      Book.findOne({ _id: req.params.id })
        .then((book) => {
          if (book.userId != req.auth.userId) {
            res.status(401).json({ message: 'Non autorisé' });
          } else {
            // Vérifier si une nouvelle image a été téléchargée
            if (pathImage) {
              // Supprimer l'ancienne image
              const imagePath = book.imageUrl.split(`${req.protocol}://${req.get('host')}/`)[1];
              fs.unlink(imagePath, (err) => {
                if (err) {
                  console.error(err);
                }
              });
            }
    
            Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
              .then(() => res.status(200).json({ message: 'Livre modifié!' }))
              .catch((error) => res.status(401).json({ error }));
          }
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    };
    
      
    
      
 exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id})
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({message: 'Non autorisé'});
            } else {
                const filename = book.imageUrl.split('/image/')[1];
                fs.unlink(`image/${filename}`, () => {
                    Book.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Livre supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };

exports.findOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id})
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error })); 
}

exports.findAllBook = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
}
