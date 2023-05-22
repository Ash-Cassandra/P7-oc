const express = require('express');
const router = express.Router();

const Book =  require('../models/Book');

router.post('/', (req, res, next) => {
    delete req.body._id;
    const book = new Book({
        ...req.body
    });
    book.save()
        .then(() => res.status(201).json({ message: 'livre enregistré'}))
        .catch(error => res.status(400).json({ error }));
});


router.get('/', (req, res, next) => {
    const book = [
        {
            "id": "1",
  "userId" : "clc4wj5lh3gyi0ak4eq4n8syr",
  "title" : "Milwaukee Mission",
  "author": "Elder Cooper",
  "imageUrl" : "https://via.placeholder.com/206x260",
  "year" : 2021,
  "genre" : "Policier",
  "ratings" : [{
    "userId" : "1",
    "grade": 5
  },
    {
      "userId" : "1",
      "grade": 5
    },
    {
      "userId" : "clc4wj5lh3gyi0ak4eq4n8syr",
      "grade": 5
    },
    {
      "userId" : "1",
      "grade": 5
    }],
  "averageRating": 3
        }
    ];
    res.status(200).json(book);
})

module.exports = router;