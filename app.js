var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello, World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

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
