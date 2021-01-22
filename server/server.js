const express = require('express');
const cors = require('cors');
var fs = require('fs');
var path = require('path');
const MongoClient = require('mongodb').MongoClient

var randomNum = 251;

const app = express();
app.use(cors());
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
        res.json({
            status: 'success',
            randomNum: data.randomNum
        });
        randomNum = data.randomNum;
    });
    app.get('/movie', (req, res) => {
        db.collection('cluster0').find({ id: randomNum }).toArray(function(err, result) {
            res.render('index.ejs', {movie: result});
        });
    });
}).catch(error => console.error(error));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.group(`Listening at http://localhost:${port}`);
});
