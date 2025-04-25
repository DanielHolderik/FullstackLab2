const mongoose = require('mongoose');
const project = require('./project');

const assigmentSchema = new mongoose.Schema({
    employeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employe', required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    startDate: { type: Date, required: true },
}, { collection: "projectassigment" });

const ProjectAssigment = mongoose.models.ProjectAssigment || mongoose.model('ProjectAssigment', assigmentSchema);
module.exports = ProjectAssigment;