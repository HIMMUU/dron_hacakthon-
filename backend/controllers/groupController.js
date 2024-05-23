const Group = require('../models/Group');
const User = require('../models/User');

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

module.exports = { getGroups, addGroup, getGroupById };
