var config = require('./config');
var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var path = require('path');
var User = require('./models/user');
var Case = require('./models/case');
var logout = require('express-passport-logout');

var assert = require('assert');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;


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

app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


var url = config.mongo.url;
var mongoose = require('mongoose');
mongoose.connect(url);


passport.use(new FacebookStrategy({
    clientID: '135116307017055',
    clientSecret: '26f724657f5de18efbbf78f3c10dfad9',
    callbackURL: config.facebook.callBackUrl + '/login/facebook/callback',
    profileFields: ['id', 'displayName', 'name', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
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
  }
));

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected to db");

  db.close();
});

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
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/profile');
  });

app.get('/logout/facebook', function(req, res){
      req.logout();
      res.redirect('/');
    });

app.get('/case', function(req, res){
      res.render('cases/new');
    });

app.post('/case', (req, res) => {
  var newCase = new Case();
  newCase.save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.send(req.body.name)
  })
});

app.get('/case/index', (req, res) => {
  var cursor = Case.find()
})

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Connected to server');
});



module.exports = server;
