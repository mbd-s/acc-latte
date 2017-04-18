var config = {};
config.mongo = {}
config.facebook = {}

config.env = process.env.NODE_ENV || 'development';
config.facebook.id = process.env.CLIENT_ID;
config.facebook.appSecret = process.env.CLIENT_SECRET;

if (config.env === 'production'){
  config.mongo.url = process.env.MONGODB_URI;
  config.facebook.callBackUrl = 'https://acc-latte.herokuapp.com';
}
else {
  config.mongo.url = 'mongodb://localhost:27017/test';
  config.facebook.callBackUrl = 'http://localhost:3000';
}

module.exports = config;
