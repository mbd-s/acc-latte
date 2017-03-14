var config = {};

config.mongo = {}
config.mongo.url = process.env.MONGODOB_URI;

module.exports = config;
console.log(process.env.MONGODOB_URI)
