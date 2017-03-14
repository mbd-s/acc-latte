var express = require('express')
var app = express()
require('dotenv').load()

var config = require('./config');

var url = config.mongo.url;
console.log('****************************');
console.log(url);

app.get('/', function (req, res) {
  res.send('Hello, World!')
})

app.listen(process.env.PORT || 3000, function() {
  console.log('Connected to server')
});

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected to db");

  db.close();
});
