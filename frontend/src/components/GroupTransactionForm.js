import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useParams } from 'react-router-dom';

const GroupTransactionForm = () => {
    const { groupId } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
        sender: '',
        receivers: [] // Updated for multiple receivers
    });
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await axios.get(`http://localhost:5000//api/groups/${groupId}/members`);
                const memberOptions = res.data.map(member => ({
                    value: member._id,
                    label: member.name
                }));
                setMembers(memberOptions);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMembers();
    }, [groupId]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = selectedOptions => {
        setFormData({ ...formData, receivers: selectedOptions.map(option => option.value) });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000//api/groups/transactions`, { ...formData, groupId });
            setFormData({ title: '', amount: '', category: '', sender: '', receivers: [] });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Add Group Transaction</h1>
            <form onSubmit={handleSubmit} className="flex flex-col w-1/2">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="mb-2 p-2 border border-gray-300"
                />
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                    className="mb-2 p-2 border border-gray-300"
                />
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="mb-2 p-2 border border-gray-300"
                />
                <input
                    type="text"
                    name="sender"
                    value={formData.sender}
                    onChange={handleChange}
                    placeholder="Sender"
                    className="mb-2 p-2 border border-gray-300"
                />
                <Select
                    isMulti
                    name="receivers"
                    options={members}
                    className="mb-2 p-2 border border-gray-300"
                    placeholder="Select Receivers"
                    onChange={handleSelectChange}
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Add Transaction
                </button>
            </form>
        </div>
    );
};

export default GroupTransactionForm;
