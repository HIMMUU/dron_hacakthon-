import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionList from './TransactionList'; // Import TransactionList component

const Dashboard = () => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
        sender: '',
        receiver: ''
    });
    const [error, setError] = useState('');

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        const { title, amount, category, sender, receiver } = formData;
        if (!title || !amount || !category || !sender || !receiver) {
            setError('All fields are required');
            return;
        }

        axios.post('http://localhost:5000/api/transactions/add', formData)
            .then(res => {
                setFormData({ title: '', amount: '', category: '', sender: '', receiver: '' });
                setError('');
            })
            .catch(err => {
                console.error(err);
                setError('Failed to add transaction');
            });
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Add Transaction</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col w-1/2 mx-auto">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                    className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="text"
                    name="sender"
                    value={formData.sender}
                    onChange={handleChange}
                    placeholder="Sender"
                    className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="text"
                    name="receiver"
                    value={formData.receiver}
                    onChange={handleChange}
                    placeholder="Receiver"
                    className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">
                    Add Transaction
                </button>
            </form>

            <h1 className="text-3xl font-bold mt-8 mb-6 text-center">Transactions</h1>
            <TransactionList /> {/* Use TransactionList component */}
        </div>
    );
};

export default Dashboard;
