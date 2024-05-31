import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/transactions')
            .then(res => setTransactions(res.data))
            .catch(err => console.error(err));
    }, []);

    const acceptTransaction = (id) => {
        axios.put(`http://localhost:5000/api/transactions/${id}/accept`)
            .then(res => setTransactions(transactions.map(transaction => transaction._id === id ? res.data : transaction)))
            .catch(err => console.error(err));
    };

    const declineTransaction = (id) => {
        axios.put(`http://localhost:5000/api/transactions/${id}/decline`)
            .then(() => setTransactions(transactions.filter(transaction => transaction._id !== id)))
            .catch(err => console.error(err));
    };

    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Transactions</h2>
            <div>
                {transactions.map(transaction => (
                    <div key={transaction._id} className="border p-4 mb-2">
                        <p><strong>Title:</strong> {transaction.title}</p>
                        <p><strong>Amount:</strong> ${transaction.amount}</p>
                        <p><strong>Category:</strong> {transaction.category}</p>
                        <p><strong>Sender:</strong> {transaction.sender}</p>
                        <p><strong>Receiver:</strong> {transaction.receiver}</p>
                        <p><strong>Date:</strong> {new Date(transaction.date).toLocaleString()}</p>
                        {!transaction.isAccepted && (
                            <div>
                                <button onClick={() => acceptTransaction(transaction._id)} className="bg-green-500 text-white py-2 px-4 rounded mr-2">Accept</button>
                                <button onClick={() => declineTransaction(transaction._id)} className="bg-red-500 text-white py-2 px-4 rounded">Decline</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionList;
