const express = require('express');
const { protect } = require('../middleware/auth');
const { getGroups, addGroup, getGroupById } = require('../controllers/groupController');

const router = express.Router();

router.get('/', protect, getGroups);
router.post('/add', protect, addGroup);
router.get('/:groupId', protect, getGroupById);

module.exports = router;
