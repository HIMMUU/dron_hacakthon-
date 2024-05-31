const mongoose = require('mongoose');

const GroupTransactionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    payer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    payees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GroupTransaction', GroupTransactionSchema);
