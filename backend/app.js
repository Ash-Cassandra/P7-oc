const express = require('express');
const mongoose = require('mongoose');

const Book =  require('./models/Book');
const app = express();

mongoose.connect('mongodb+srv://user1:user1@ash.vxla1es.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.post('/api/books', (req, res, next) => {
    delete req.body._id;
    const book = new Book({
        ...req.body
    });
    book.save()
        .then(() => res.status(201).json({ message: 'livre enregistré'}))
        .catch(error => res.status(400).json({ error }));
});

app.get('/api/books', (req, res, next) => {
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

module.exports = app;