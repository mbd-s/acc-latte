var express = require('express');
var app = express();
require('dotenv').load();

var config = require('./config');

var FacebookStrategy = require('passport-facebook').Strategy;

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

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
  res.send('Hello, World!');
})

app.get('/login',
  function(req, res){
    res.render('login');
  });

app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/login/facebook/callback',
  function(req, res) {
    res.redirect('/');
  });

app.listen(process.env.PORT || 3000, function() {
  console.log('Connected to server');
});

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected to db");

  db.close();
});
