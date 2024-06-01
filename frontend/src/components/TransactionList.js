import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/transactions')
            .then(res => {
                setTransactions(res.data);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch(err => {
                console.error(err);
                setError('Failed to fetch transactions');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading message while fetching data
    }

    if (error) {
        return <div>{error}</div>; // Show error message if there is an error
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            {transactions.length > 0 ? (
                transactions.map(transaction => (
                    <div key={transaction._id} className="border p-4 mb-4 bg-white shadow-md rounded-lg">
                        <p className="text-lg font-bold mb-2">Title: {transaction.title}</p>
                        <p><strong>Amount:</strong> ${transaction.amount}</p>
                        <p><strong>Category:</strong> {transaction.category}</p>
                        <p><strong>Sender:</strong> {transaction.sender}</p>
                        <p><strong>Receiver:</strong> {transaction.receiver}</p>
                    </div>
                ))
            ) : (
                <p>No transactions found.</p>
            )}
        </div>
    );
};

export default TransactionList;
