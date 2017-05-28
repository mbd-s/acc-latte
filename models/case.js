var mongoose = require('mongoose');
var caseSchema = mongoose.Schema({
    id: String,
    name: String
});

var Case = mongoose.model('Case', caseSchema);

module.exports = Case
