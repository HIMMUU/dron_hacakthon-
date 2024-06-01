import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { calculateBalances } from '../utils';

const GroupTransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [personalBalances, setPersonalBalances] = useState({});
    const [groupBalances, setGroupBalances] = useState({});

    useEffect(() => {
        axios.get('http://localhost:5000/api/transactions')
            .then(res => {
                setTransactions(res.data);
                const { personalBalances, groupBalances } = calculateBalances(res.data);
                setPersonalBalances(personalBalances);
                setGroupBalances(groupBalances);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to fetch transactions');
                setLoading(false);
            });
    }, []);

    const handleRemove = (id) => {
        axios.delete(`http://localhost:5000/api/transactions/${id}`)
            .then(res => {
                const updatedTransactions = transactions.filter(t => t._id !== id);
                setTransactions(updatedTransactions);
                const { personalBalances, groupBalances } = calculateBalances(updatedTransactions);
                setPersonalBalances(personalBalances);
                setGroupBalances(groupBalances);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to remove transaction');
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const renderBalances = (balances) => {
        return Object.keys(balances).map(member => (
            <div key={member}>
                <h3 className="text-xl font-semibold">{member} owes:</h3>
                <ul>
                    {Object.keys(balances[member]).map(other => (
                        <li key={other}>
                            {other}: ${balances[member][other].toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>
        ));
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            {/* Personal Transactions Section */}
            <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Personal Transactions</h2>
                {transactions.filter(t => t.type === 'personal').map(transaction => (
                    <div key={transaction._id} className="mb-4 p-4 border border-gray-300 rounded shadow-sm">
                        <h3 className="text-lg font-semibold">{transaction.title}</h3>
                        <p>Amount: ${transaction.amount.toFixed(2)}</p>
                        <p>Category: {transaction.category}</p>
                        <p>Sender: {transaction.sender}</p>
                        <p>Receivers: {transaction.receivers.join(', ')}</p>
                        <button 
                            onClick={() => handleRemove(transaction._id)} 
                            className="text-red-500 hover:underline mt-2"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </section>

            {/* Group Transactions Section */}
            <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Group Transactions</h2>
                {transactions.filter(t => t.type === 'group').map(transaction => (
                    <div key={transaction._id} className="mb-4 p-4 border border-gray-300 rounded shadow-sm">
                        <h3 className="text-lg font-semibold">{transaction.title}</h3>
                        <p>Amount: ${transaction.amount.toFixed(2)}</p>
                        <p>Category: {transaction.category}</p>
                        <p>Sender: {transaction.sender}</p>
                        <p>Receivers: {transaction.receivers.join(', ')}</p>
                        <button 
                            onClick={() => handleRemove(transaction._id)} 
                            className="text-red-500 hover:underline mt-2"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </section>

            {/* Personal Balances Section */}
            {/* <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Personal Balances</h2>
                {renderBalances(personalBalances)}
            </section> */}

            {/* Group Balances Section */}
            <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Group Balances</h2>
                {renderBalances(groupBalances)}
            </section>
        </div>
    );
};

//         <div className="w-full max-w-3xl mx-auto">
//             <h2 className="text-2xl font-bold mt-8 mb-4">Personal Transactions</h2>
//             {transactions.filter(t => t.type === 'personal').map(transaction => (
//                 <div key={transaction._id} className="mb-4 p-4 border border-gray-300 rounded">
//                     <h3 className="text-lg font-semibold">{transaction.title}</h3>
//                     <p>Amount: ${transaction.amount.toFixed(2)}</p>
//                     <p>Category: {transaction.category}</p>
//                     <p>Sender: {transaction.sender}</p>
//                     <p>Receivers: {transaction.receivers.join(', ')}</p>
//                     <button onClick={() => handleRemove(transaction._id)} className="text-red-500 hover:underline">
//                         Remove
//                     </button>
//                 </div>
//             ))}

//             <h2 className="text-2xl font-bold mt-8 mb-4">Group Transactions</h2>
//             {transactions.filter(t => t.type === 'group').map(transaction => (
//                 <div key={transaction._id} className="mb-4 p-4 border border-gray-300 rounded">
//                     <h3 className="text-lg font-semibold">{transaction.title}</h3>
//                     <p>Amount: ${transaction.amount.toFixed(2)}</p>
//                     <p>Category: {transaction.category}</p>
//                     <p>Sender: {transaction.sender}</p>
//                     <p>Receivers: {transaction.receivers.join(', ')}</p>
//                     <button onClick={() => handleRemove(transaction._id)} className="text-red-500 hover:underline">
//                         Remove
//                     </button>
//                 </div>
//             ))}

//             <h2 className="text-2xl font-bold mt-8 mb-4">Personal Balances</h2>
//             {renderBalances(personalBalances)}

//             <h2 className="text-2xl font-bold mt-8 mb-4">Group Balances</h2>
//             {renderBalances(groupBalances)}
//         </div>
//     );
// };

export default GroupTransactionList;
