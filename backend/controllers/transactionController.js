// controllers/transactionController.js

const Transaction = require('../models/Transaction');

exports.addTransaction = async (req, res) => {
  const { title, amount, category, sender, receivers } = req.body;

  // Ensure all required fields are present
  if (!title || !amount || !category || !sender || !receivers) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const newTransaction = new Transaction({ title, amount, category, sender, receivers });
    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (err) {
    console.error('Failed to add transaction:', err.message);
    res.status(500).send('Server Error');
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
