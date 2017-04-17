var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
  facebook: (
    id: String,
    name: String,
    token: String,
    email: String,
  )

});
