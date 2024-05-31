const Transaction = require('../models/Transaction');

// Get all transactions
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate('sender receiver', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a new transaction
const addTransaction = async (req, res) => {
    const { title, amount, category, sender, receiver } = req.body;
    try {
        const transaction = await Transaction.create({ title, amount, category, sender, receiver });
        console.log(transaction);
        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Accept a transaction
const acceptTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.transactionId, { isAccepted: true }, { new: true });
        res.status(200).json(transaction);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Decline a transaction
const declineTransaction = async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.transactionId);
        res.status(204).json({ message: 'Transaction declined and removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get transactions of a specific group
const getGroupTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ group: req.params.groupId })
            .populate('sender receiver', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a transaction to a specific group
const addGroupTransaction = async (req, res) => {
    const { title, amount, category, receiver } = req.body;
    try {
        const transaction = await Transaction.create({ title, amount, category, sender: req.user.id, receiver, group: req.params.groupId });
        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getTransactions, addTransaction, acceptTransaction, declineTransaction, getGroupTransactions, addGroupTransaction };
