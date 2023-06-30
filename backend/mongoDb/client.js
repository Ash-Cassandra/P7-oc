const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const booksData = require('../../public/data/data.json')

const url = 'https://cloud.mongodb.com/v2/64799174430af210510985dc#/clusters/detail/Cluster0';
const dbName = 'Cluster0';

app.post('/client', (req, res) => {
  MongoClient.connect(url, function(err, client) {
    if (err) {
      console.error('Erreur de connexion à la base de données :', err);
      return res.status(500).json({ message: 'Erreur de connexion à la base de données' });
    }

    const db = client.db(dbName);
    const collection = db.collection('livres');


    collection.insertMany(booksData, function(err, result) {
      if (err) {
        console.error('Erreur:', err);
        return res.status(500).json({ message: 'Erreur lors de l\'insertion des données' });
      }

      console.log('succès.');
      return res.status(200).json({ message: 'Données insérées avec succès' });
    });

    client.close();
  });
});
