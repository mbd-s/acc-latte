var mongoose = require('mongoose');
var requirementItemSchema = mongoose.Schema({
    id: String,
    requirementId: String,
    name: String,
    Cost: Number
});

var RequirementItem = mongoose.model('RequirementItem', requirementItemSchema);

module.exports = RequirementItem
