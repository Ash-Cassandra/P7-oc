const mongoose = require ('mongoose');
 const { number } = require('prop-types');

const bookSchema = mongoose.Schema({    
    userId: {type: String},
    author: {type: String, required: true},
    genre: {type: String, required: true},
    imageUrl: {type: String, required: true},
    title: {type: String, required: true},
    year: {type: Number, required: true},
    ratings: [
        {
            userId : {type: String},
            grade : {type: Number}
        }
    ],
    averageRating : {type: Number}
});

module.exports = mongoose.model('Book', bookSchema);