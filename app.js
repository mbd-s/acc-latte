var express = require('express');
var app = express();
var renderLayouts = require('layouts');

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
    if (user) {
        res.sendFile('profile', { root: views_path } );
    } else if (err) {
          return done(err);
    } else {
        // if there is no user found with that facebook id, create them
        var newUser = new User();

        // set all of the facebook information in our user model
        newUser.facebook.id    = profile.id; // set the users facebook id
        newUser.facebook.token = token; // we will save the token that facebook provides to the user
        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
        console.log(profile.id);
        // save our user to the database
        newUser.save(function(err) {
            if (err)
                throw err;
            // if successful, return the new user
            return done(null, newUser);
        });
      }
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
      //else
      // res.sendFile('index.html'); with error message

        // if the user is found, then log them in

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
