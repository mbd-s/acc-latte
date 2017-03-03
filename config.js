var config = {};

config.mongo = {}
config.mongo.url = process.env.MONGODOB_URL || 'url';

module.exports = config;
