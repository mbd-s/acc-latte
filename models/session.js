var mongoose = require('mongoose');
var sessionSchema = mongoose.Schema({
    id: String,
    UserId: String,
    lastStage: String,
    CaseId: String
});

var Session = mongoose.model('Session', sessionSchema);

module.exports = Session
