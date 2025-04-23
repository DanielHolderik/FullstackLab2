const mongoose = require('mongoose');

const employeSchema = new mongoose.Schema({
    employeId: { type: String, required: true},
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    hashedPass: String,
});
module.exports = mongoose.model('Employe', employeSchema);