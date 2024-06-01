import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GroupTransactions = () => {
    const { groupId } = useParams();
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get(`/api/groups/${groupId}/transactions`);
                setTransactions(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchTransactions();
    }, [groupId]);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Group Transactions</h1>
            <div className="w-1/2">
                {transactions.map(transaction => (
                    <div key={transaction._id} className="border p-4 mb-2">
                        <p><strong>Title:</strong> {transaction.title}</p>
                        <p><strong>Amount:</strong> ${transaction.amount}</p>
                        <p><strong>Category:</strong> {transaction.category}</p>
                        <p><strong>Sender:</strong> {transaction.sender}</p>
                        <p><strong>Receivers:</strong> {transaction.receivers.map(receiver => receiver.name).join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroupTransactions;
