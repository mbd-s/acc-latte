var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello, World!')
})

app.listen(process.env.PORT || 3000, function() {
  console.log('acc-latte app connected to server')
});

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});
