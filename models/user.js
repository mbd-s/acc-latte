var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
  facebook: {
    id: String,
    name: String,
    token: String,
    email: String,
  },
  cofeeShopInfo: {
    
  }
});

var User = mongoose.model('User', userSchema);

module.exports = User
