var config = require('./config');
var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var path = require('path');

passport.use(new FacebookStrategy({
    clientID: config.facebook.id,
    clientSecret: config.facebook.appSecret,
    callbackURL: config.facebook.callBackUrl + '/login/facebook/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    // process.nextTick(function() {
      console.log(profile);
      User.findOne({'facebook.id': profile.id}, function(err, user){
        if (err) {
          console.log('Error')
          return cb(err);
        }
        if (user) {
          console.log('User found')
          return cb(null, user);
        } else {
          console.log('Creating user')

          var newUser = new User();
          newUser.facebook.id = profile.id;
          newUser.facebook.token = profile.accessToken;
          newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.facebook.email = profile.emails[0].value;

          newUser.save(function(err, newUser){
            if(err)
              throw err;
            return cb(null, newUser);
          })
        }
      })
    // })
  }
));


var exphbs  = require('express-handlebars');
var app = express();

require('dotenv').config();

app.engine('handlebars', exphbs({defaultLayout: 'nav'}));
app.set('view engine', 'handlebars');

var views_path = path.join(__dirname, '/views')
app.use(express.static(views_path))
app.use(express.static('public'))

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

var url = config.mongo.url;
var mongoose = require('mongoose');
mongoose.connect(url);

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
    passport.authenticate('facebook', { scope: ['email'] }));

    app.get('/login/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
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
