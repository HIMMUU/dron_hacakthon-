const express = require('express');
const { getGroups, addGroup, getGroupById, getGroupMembers, addTransaction } = require('../controllers/groupController');
const router = express.Router();

// Get all groups
router.get('/', getGroups);

// Add a new group
router.post('/create', addGroup);

// Get group by ID
router.get('/:groupId', getGroupById);

// Get all members of a group
router.get('/:groupId/members', getGroupMembers);

// Add a transaction to a group
router.post('/:groupId/transactions', addTransaction);

module.exports = router;
