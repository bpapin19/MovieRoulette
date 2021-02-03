const express = require('express');
const cors = require('cors');
var fs = require('fs');
var path = require('path');
const MongoClient = require('mongodb').MongoClient

var randomNum = 251;
var genre = "All";

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname + '/public')));
const DB_USER = 'Brandon';
const PASSWORD = encodeURIComponent('Br@nd0np');
const mongoURL = `mongodb+srv://${DB_USER}:${PASSWORD}@cluster0.el4df.mongodb.net/moviedb?authSource=admin`;

MongoClient.connect(mongoURL, {
    useUnifiedTopology: true
  }).then(client => {
    console.log('Connected to Database');
    const db = client.db('moviedb');

    app.set('view engine', 'ejs');

    app.post('/', (req, res) => {
        data = req.body;
        randomNum = data.randomNum;
        genre = data.genre;
        if (genre === 'All' || genre === 'Select') {
            db.collection('cluster0').find({ id: randomNum }).toArray(function(err, result) {
                return res.status(200).json(result[0]);
            });
        } else {
            var regexGenre = new RegExp(".*" + genre + "*.");
            db.collection('cluster0').find({ genre: regexGenre }).toArray(function(err, result) {
                result = result[Math.floor(Math.random() * (result.length) + 0)];
                return res.status(200).json(result);
            });
        }
        return res.status(400);
    });
});

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.group(`Listening at http://localhost:${port}`);
});
