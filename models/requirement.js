var mongoose = require('mongoose');
var requirementSchema = mongoose.Schema({
    id: String,
    CaseId: String,
    name: String
});

var Requirement = mongoose.model('Requirement', requirementSchema);

module.exports = Requirement
