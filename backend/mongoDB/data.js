const MongoClient = require('mongodb').MongoClient;

const url = 'https://cloud.mongodb.com/v2/64799174430af210510985dc#'; // Remplacez l'URL par celle de votre base de données
const dbName = 'Cluster0'; // Remplacez par le nom de votre base de données
const collectionName = 'test.books'; // Remplacez par le nom de votre collection

const books = require('../data')
console.log('books', books);

MongoClient.connect(url, function(err, client) {
  if (err) {
    console.error('Erreur de connexion à MongoDB :', err);
    return;
  }

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  collection.insertMany(books, function(err, result) {
    if (err) {
      console.error('Erreur lors de l\'insertion des documents :', err);
    } else {
      console.log('Documents insérés avec succès :', result.insertedCount);
    }

    client.close();
  });
});
