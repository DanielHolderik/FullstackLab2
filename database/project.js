const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String},
});
module.exports = mongoose.model('Project', projectSchema);