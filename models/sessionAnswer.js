var mongoose = require('mongoose');
var sessionAnswerSchema = mongoose.Schema({
    id: String,
    SessionId: String,
    QuestionId: String,
    answer: String
});

var SessionAnswer = mongoose.model('SessionAnswer', sessionAnswerSchema);

module.exports = SessionAnswer
