var express = require('express');
var app = express();

require('dotenv').config();

var path = require('path');
var config = require('./config');

var FacebookStrategy = require('passport-facebook').Strategy;
var views_path = path.join(__dirname, '/views')
app.use(express.static(views_path))
app.use(express.static('public'))

var url = config.mongo.url;
var mongoose = require('mongoose');
mongoose.connect(url);

var passport = require('passport');

passport.use(new FacebookStrategy({
    clientID: config.facebook.id,
    clientSecret: config.facebook.appSecret,
    callbackURL: config.facebook.callBackUrl + '/login/facebook/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
  }
));

app.get('/', function (req, res) {
  res.sendFile('index.html');
})

app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/login/facebook/callback',
  function(req, res) {
    console.log(req)
    //if login successfull
      //extract user login token
      //extract user details (email, firstname, lastname)
      //save user if user does not already exists
      //if user already exists update login token
      //else create new user
      res.sendFile('dashboard.html', { root: views_path });
    //else
      // res.sendFile('index.html'); with error message
  });

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Connected to server');
});

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected to db");

  db.close();
});

module.exports = server;
