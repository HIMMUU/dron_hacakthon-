const Group = require('../models/Group');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Get all groups
const getGroups = async (req, res) => {
    try {
        const groups = await Group.find().populate('members', 'name email');
        res.status(200).json(groups);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a new group
const addGroup = async (req, res) => {
    const { name, members } = req.body;
    try {
        const userIds = await User.find({ email: { $in: members } }).select('_id');
        const group = await Group.create({ name, members: userIds });
        res.status(201).json(group);
        console.log(userIds)
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get group by ID
const getGroupById = async (req, res) => {
    try {
        const group = await Group.findById(req.params.groupId).populate('members', 'name email');
        res.status(200).json(group);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all members of a group
const getGroupMembers = async (req, res) => {
    const { groupId } = req.params;

    try {
        const group = await Group.findById(groupId).populate('members');
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        res.status(200).json(group.members);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a transaction to a group
const addTransaction = async (req, res) => {
    const { groupId, title, amount, category, sender, receivers } = req.body;
    try {
        const newTransaction = new Transaction({
            groupId,
            title,
            amount,
            category,
            sender,
            receivers
        });
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getGroups, addGroup, getGroupById, getGroupMembers, addTransaction };
