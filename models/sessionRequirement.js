var mongoose = require('mongoose');
var sessionRequirementSchema = mongoose.Schema({
    id: String,
    SessionId: String,
    RequirementId: String,
    choice: String
});

var SessionRequirement = mongoose.model('SessionRequirement', sessionRequirementSchema);

module.exports = SessionRequirement
