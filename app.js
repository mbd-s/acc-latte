var express = require('express')
var app = express()
require('dotenv').config()

var config = require('./config');

app.get('/', function (req, res) {
  res.send('Hello, World!')
})

app.listen(process.env.PORT || 3000, function() {
  console.log('Connected to server')
});

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = config.mongo.url;

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected to db");

  db.close();
});
