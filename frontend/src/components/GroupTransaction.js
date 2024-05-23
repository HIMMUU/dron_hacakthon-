import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GroupTransactions = () => {
    const { groupId } = useParams();
    const [transactions, setTransactions] = useState([]);
    const [formData, setFormData] = useState({ title: '', amount: '', category: '', receiver: '' });

    useEffect(() => {
        axios.get(`/api/groups/${groupId}/transactions`)
            .then(res => setTransactions(res.data))
            .catch(err => console.error(err));
    }, [groupId]);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.post(`/api/groups/${groupId}/transactions/add`, formData)
            .then(res => setTransactions([...transactions, res.data]))
            .catch(err => console.error(err));
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Group Transactions</h1>
            <form onSubmit={handleSubmit} className="flex flex-col mb-4">
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="mb-2 p-2 border border-gray-300" />
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" className="mb-2 p-2 border border-gray-300" />
                <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="mb-2 p-2 border border-gray-300" />
                <input type="text" name="receiver" value={formData.receiver} onChange={handleChange} placeholder="Receiver" className="mb-2 p-2 border border-gray-300" />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Add Transaction</button>
            </form>
            <div>
                {transactions.map(transaction => (
                    <div key={transaction._id} className="border p-4 mb-2">
                        <p><strong>Title:</strong> {transaction.title}</p>
                        <p><strong>Amount:</strong> ${transaction.amount}</p>
                        <p><strong>Category:</strong> {transaction.category}</p>
                        <p><strong>Receiver:</strong> {transaction.receiver}</p>
                        <p><strong>Date:</strong> {new Date(transaction.date).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroupTransactions;
