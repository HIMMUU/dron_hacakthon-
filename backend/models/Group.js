const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: { type: [] }
});

module.exports = mongoose.model('Group', groupSchema);
