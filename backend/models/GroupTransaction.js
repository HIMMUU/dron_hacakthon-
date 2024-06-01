const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receivers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    category: { type: String, required: true },
    title: { type: String, required: true },
     groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: false }
});

module.exports = mongoose.model('Transaction', TransactionSchema);