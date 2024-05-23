const express = require('express');
const { protect } = require('../middleware/auth');
const {
    getTransactions,
    addTransaction,
    acceptTransaction,
    declineTransaction,
    getGroupTransactions,
    addGroupTransaction
} = require('../controllers/transactionController');

const router = express.Router();

router.get('/', protect, getTransactions);
router.post('/add', protect, addTransaction);
router.put('/:transactionId/accept', protect, acceptTransaction);
router.put('/:transactionId/decline', protect, declineTransaction);
router.get('/:groupId/transactions', protect, getGroupTransactions);
router.post('/:groupId/transactions/add', protect, addGroupTransaction);

module.exports = router;
