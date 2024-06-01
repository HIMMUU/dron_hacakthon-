// const express = require('express');
 const {  getGroupById, getGroupMembers, addTransaction } = require('../controllers/groupController');
// const router = express.Router();

// // Get all groups
// router.get('/', getGroups);

// // Add a new group
// router.post('/create', addGroup);



// module.exports = router;
const express = require('express');
const router = express.Router();
const Group = require('../models/Group');

// Get all groups
router.get('/', async (req, res) => {
    try {
        const groups = await Group.find();
        res.json(groups);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new group
router.post('/create', async (req, res) => {
    const group = new Group({
        name: req.body.name,
        members: req.body.members
    });
    try {
        const newGroup = await group.save();
        res.status(201).json(newGroup);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
 //Get group by ID
router.get('/:groupId', getGroupById);


// Get all members of a group
router.get('/:groupId/members', getGroupMembers);

// Add a transaction to a group
router.post('/:groupId/transactions/add', addTransaction);


module.exports = router;

