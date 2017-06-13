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
var methodOverride = require('method-override');
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

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// app.use(bodyParser.json())
// app.use(methodOverride(function(req, res){
//   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//     var method = req.body._method
//     delete req.body._method
//     return method
//   }
// }))
app.use(methodOverride('_method'));

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
  Case.find(function(err, all_cases) {
      res.render('profile', { cases: all_cases });
  });
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

app.get('/cases/new', function(req, res){
      res.render('cases/new');
    });

app.post('/cases', function(req, res) {
  var newCase = new Case();
  newCase.name = req.body.name
  newCase.save(req.body, (err, found) => {
    if (err) return console.log(err)

    return res.redirect('cases/' + found._id);
  })
});

app.get('/cases/:id', (req, res) => {
  Case.findById(req.params.id, function (err, found) {
    if (err) return console.log(err)

    res.render('cases/show', { case: { id: found._id, name: found.name } });
  })
});

app.get('/cases/:id/edit', (req, res) => {
  Case.findById(req.params.id, (err, found) => {
    if (err) return console.log(err)

    res.render('cases/edit', { case: { id: found._id, name: found.name } });
  })
});

app.put('/cases/:id', (req, res) => {
  Case.findByIdAndUpdate(req.params.id, { name: req.body.name },  { }, (err, found) => {
    if (err) return console.log(err)

    return res.redirect(req.params.id);
  })
});

app.get('/cases', function(req, res) {
    Case.find(function(err, all_cases) {
        res.render('cases/index', { cases: all_cases });
    });
});

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Connected to server');
});

module.exports = server;
