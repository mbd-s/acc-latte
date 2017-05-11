var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
  facebook: {
    id: String,
    name: String,
    token: String,
    email: String,
  },
  cofeeShopInfo: {
    cofee_shop_name: String,
    cofee_shop_rent: String
  }
});

var User = mongoose.model('User', userSchema);

module.exports = User
