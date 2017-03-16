var config = {};
config.mongo = {}

var env = process.env.NODE_ENV || 'development';

if (env === 'production'){
  config.mongo.url = process.env.MONGODB_URI;
}
else {
  config.mongo.url = 'mongodb://localhost:27017/test'
}

module.exports = config;
