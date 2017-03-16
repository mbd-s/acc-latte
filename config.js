var config = {};
config.mongo = {}

var env = process.env.NODE_ENV || 'production';

if (env === 'production'){
  config.mongo.url = process.env.MONGODOB_URI;
}
else {
  config.mongo.url = 'mongodb://localhost:27017/test'
}

module.exports = config;
console.log(process.env.MONGODOB_URI);
