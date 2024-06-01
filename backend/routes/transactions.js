// const express = require('express');
// const { protect } = require('../middleware/auth');
// const {
//     getTransactions,
//     addTransaction,
//     acceptTransaction,
//     declineTransaction,
//     getGroupTransactions,
//     addGroupTransaction
// } = require('../controllers/transactionController');

// const router = express.Router();

// router.get('/',  getTransactions);
// router.post('/add',  addTransaction);
// router.put('/:transactionId/accept', acceptTransaction);
// router.put('/:transactionId/decline',  declineTransaction);
// router.get('/:groupId/transactions', getGroupTransactions);
// router.post('/:groupId/transactions/add',  addGroupTransaction);

// // module.exports = router;
// const express = require('express');
// const router = express.Router();
// const { addTransaction, getTransactions } = require('../controllers/transactionController');

// router.post('/add', addTransaction);
// router.get('/', getTransactions);
// routes/transactions.js
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET all transactions
router.get('/', async (req, res) => {
    try {
      const transactions = await Transaction.find();
      res.json(transactions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // POST a new transaction
  router.post('/add', async (req, res) => {
    const transaction = new Transaction({
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category,
      sender: req.body.sender,
      receiver: req.body.receiver,
    });
  
    try {
      const newTransaction = await transaction.save();
      res.status(201).json(newTransaction);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


module.exports = router;
``

// module.exports = router;
