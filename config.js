var config = {};

config.mongo = {}
config.mongo.url = process.env.MONGODOB_URI || 'url';

module.exports = config;
