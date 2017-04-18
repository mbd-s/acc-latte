var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
  facebook: {
    id: String,
    name: String,
    token: String,
    email: String,
  }
});
module.exports = mongoose.model('User', userSchema);
