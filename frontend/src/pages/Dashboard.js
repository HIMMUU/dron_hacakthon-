import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
        sender: '',
        receiver: ''
    });

    useEffect(() => {
        axios.get('http://localhost:5000/api/transactions')
            .then(res => setTransactions(res.data))
            .catch(err => console.error(err));
            
    }, []);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/transactions/add', formData)
            .then(res => {
                setTransactions([...transactions, res.data]);
                setFormData({ title: '', amount: '', category: '', sender: '', receiver: '' });
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Add Transaction</h1>
            <form onSubmit={handleSubmit} className="flex flex-col w-1/2">
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="mb-2 p-2 border border-gray-300" />
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" className="mb-2 p-2 border border-gray-300" />
                <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="mb-2 p-2 border border-gray-300" />
                <input type="text" name="sender" value={formData.sender} onChange={handleChange} placeholder="Sender" className="mb-2 p-2 border border-gray-300" />
                <input type="text" name="receiver" value={formData.receiver} onChange={handleChange} placeholder="Receiver" className="mb-2 p-2 border border-gray-300" />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Add Transaction</button>
            </form>

            <h1 className="text-2xl font-bold mt-8 mb-4">Transactions</h1>
            <div className="w-1/2">
                {transactions.map(transaction => (
                    <div key={transaction._id} className="border p-4 mb-2">
                        <p><strong>Title:</strong> {transaction.title}</p>
                        <p><strong>Amount:</strong> ${transaction.amount}</p>
                        <p><strong>Category:</strong> {transaction.category}</p>
                        <p><strong>Sender:</strong> {transaction.sender}</p>
                        <p><strong>Receiver:</strong> {transaction.receiver}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
