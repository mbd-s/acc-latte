var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();

require('dotenv').config();

var path = require('path');
var config = require('./config');

app.engine('handlebars', exphbs({defaultLayout: 'nav'}));
app.set('view engine', 'handlebars');

var FacebookStrategy = require('passport-facebook').Strategy;
var views_path = path.join(__dirname, '/views')
app.use(express.static(views_path))
app.use(express.static('public'))

var url = config.mongo.url;
var mongoose = require('mongoose');
mongoose.connect(url);

var passport = require('passport');

app.get('/', function (req, res) {
  res.render('index');
})

app.get('/about', function (req, res) {
  res.render('about');
})

app.get('/contact', function (req, res) {
  res.render('contact');
})

app.get('/leaderboard', function (req, res) {
  res.render('leaderboard');
})

app.get('/profile', function (req, res) {
  res.render('profile');
})

app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/login/facebook/callback',
  passport.authenticate('facebook', { successRedirect: 'profile',
                                     failureRedirect: '/' }));
  // function(req, res) {
  //   console.log(req)
  //   //if login successfull
  //     //extract user login token
  //     //extract user details (email, firstname, lastname)
  //     //save user if user does not already exists
  //     //if user already exists update login token
  //     //else create new user
  //     //else
  //     // res.sendFile('index.html'); with error message
  //
  //       // if the user is found, then log them in
  //       // if (user) {
  //       //     res.render('profile', { root: views_path } );
  //       // } else if (err) {
  //       //       return done(err);
  //       // } else {
  //       //     // if there is no user found with that facebook id, create them
  //       //     var newUser = new User();
  //        res.redirect('profile');
  //       // }
  passport.use(new FacebookStrategy({
      clientID: config.facebook.id,
      clientSecret: config.facebook.appSecret,
      callbackURL: config.facebook.callBackUrl + '/login/facebook/callback'
    },
    function(accessToken, refreshToken, profile, done, cb) {
      process.nextTick(function() {
        User.findOne({'facebook.id': profile.id}, function(err, user){
          if (err)
            return done(err);
          if (user)
            return done(null, user);
          else {
            var newUser = new User();
            newUser.facebook.id = profile.id;
            newUser.facebook.token = accessToken;
            newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
            newUser.facebook.email = profile.emails[0].value;

            newUser.save(function(err){
              if(err)
                throw err;
              return done(null, newUser);
            })
          }
        })
      })
    }
  ));


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
