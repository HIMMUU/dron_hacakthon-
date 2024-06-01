import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
        sender: '',
        receiver: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/transactions/add', formData)
            .then(res => {
                setFormData({ title: '', amount: '', category: '', sender: '', receiver: '' });
                // Handle success, e.g., update the transaction list
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Add Transaction</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="mb-2 p-2 border border-gray-300" />
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" className="mb-2 p-2 border border-gray-300" />
                <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="mb-2 p-2 border border-gray-300" />
                <input type="text" name="sender" value={formData.sender} onChange={handleChange} placeholder="Sender" className="mb-2 p-2 border border-gray-300" />
                <input type="text" name="receiver" value={formData.receiver} onChange={handleChange} placeholder="Receiver" className="mb-2 p-2 border border-gray-300" />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Add Transaction</button>
            </form>
        </div>
    );
};

export default TransactionForm;