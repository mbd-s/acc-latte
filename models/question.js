var mongoose = require('mongoose');
var questionSchema = mongoose.Schema({
    id: String,
    CaseId: String,
    stage: String,
    question: String,
    answerType: Array,
    answerOption: Array
});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question
