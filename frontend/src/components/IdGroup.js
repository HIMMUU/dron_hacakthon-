import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GroupTransactionList from './GroupTransactionList'; // Import TransactionList component
// import SplitExpenses from './SplitExpenses';

import { useParams } from 'react-router-dom';

const IdGroup= () => {
    const [formData, setFormData] = useState({
        group_id: '',
        title: '',
        amount: '',
        category: '',
        sender: '',
        receivers: [],
        type: 'personal' // Default type to personal
    });
    const [members, setMembers] = useState([]); // To store the members
    const [error, setError] = useState('');
    const { groupId } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/api/groups/${groupId}`)
            .then(res => setMembers(res.data.members))
            .catch(err => console.error(err));
    }, [groupId]);


    const handleChange = e => {
        const { name, value } = e.target;
        if (name === 'receivers') {
            const selectedReceivers = Array.from(e.target.selectedOptions, option => option.value);
            setFormData({ ...formData, receivers: selectedReceivers });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = e => {
        e.preventDefault();

        const { title, amount, category, sender, receivers, type } = formData;
        if (!title || !amount || !category || !sender || receivers.length === 0) {
            setError('All fields are required');
            return;
        }

        const transactionData = {
            ...formData,
            amount: amount / receivers.length // Split amount equally among receivers
        };

        axios.post('http://localhost:5000/api/groups/:groupId/transactions/add', transactionData)
            .then(res => {
                setFormData({ group_id:'',  title: '', amount: '', category: '', sender: '', receivers: [], type: 'personal' });
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
                <select
                    name="sender"
                    value={formData.sender}
                    onChange={handleChange}
                    className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">Select Sender</option>
                    {members.map(member => (
                        <option key={member} value={member}>{member}</option>
                    ))}
                </select>
                <select
                    name="receivers"
                    multiple
                    value={formData.receivers}
                    onChange={handleChange}
                    className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {members.map(member => (
                        <option key={member} value={member}>{member}</option>
                    ))}
                </select>
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="personal">Personal</option>
                    <option value="group">Group</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">
                    Add Transaction
                </button>
            </form>

            <h1 className="text-3xl font-bold mt-8 mb-6 text-center">Transactions</h1>
            <div>
           
                </div> <GroupTransactionList /> 
        </div>
    );
};

 export default IdGroup;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';  // Import the CSS file

// const App = () => {
//     const [transactions, setTransactions] = useState([]);
//     const [formData, setFormData] = useState({
//         title: '',
//         amount: '',
//         sender: '',
//         receivers: ''
//     });
//     const [loginData, setLoginData] = useState({
//         email: '',
//         password: ''
//     });
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [token, setToken] = useState('');

//     useEffect(() => {
//         if (isLoggedIn) {
//             axios.get('http://localhost:5000/api/transactions', {
//                 headers: { Authorization: token }
//             })
//             .then(res => setTransactions(res.data))
//             .catch(err => console.error(err));
//         }
//     }, [isLoggedIn, token]);

//     const handleLoginChange = e => {
//         const { name, value } = e.target;
//         setLoginData({ ...loginData, [name]: value });
//     };

//     const handleLoginSubmit = e => {
//         e.preventDefault();
//         axios.post('http://localhost:5000/api/login', loginData)
//             .then(res => {
//                 setToken(`Bearer ${res.data.token}`);
//                 setIsLoggedIn(true);
//             })
//             .catch(err => console.error(err));
//     };

//     const handleChange = e => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = e => {
//         e.preventDefault();
//         const receivers = formData.receivers.split(',').map(receiver => receiver.trim());
//         const transactionData = { ...formData, receivers };

//         axios.post('http://localhost:5000/api/transactions', transactionData, {
//             headers: { Authorization: token }
//         })
//             .then(res => {
//                 setTransactions([...transactions, res.data]);
//                 setFormData({ title: '', amount: '', sender: '', receivers: '' });
//             })
//             .catch(err => console.error(err));
//     };

//     return (
//         <div className="container">
//             {!isLoggedIn ? (
//                 <div>
//                     <h1>Login</h1>
//                     <form onSubmit={handleLoginSubmit}>
//                         <input
//                             type="email"
//                             name="email"
//                             value={loginData.email}
//                             onChange={handleLoginChange}
//                             placeholder="Email"
//                         />
//                         <input
//                             type="password"
//                             name="password"
//                             value={loginData.password}
//                             onChange={handleLoginChange}
//                             placeholder="Password"
//                         />
//                         <button type="submit">Login</button>
//                     </form>
//                 </div>
//             ) : (
//                 <div>
//                     <h1>Group Transactions</h1>
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="text"
//                             name="title"
//                             value={formData.title}
//                             onChange={handleChange}
//                             placeholder="Title"
//                         />
//                         <input
//                             type="number"
//                             name="amount"
//                             value={formData.amount}
//                             onChange={handleChange}
//                             placeholder="Amount"
//                         />
//                         <input
//                             type="text"
//                             name="sender"
//                             value={formData.sender}
//                             onChange={handleChange}
//                             placeholder="Sender"
//                         />
//                         <input
//                             type="text"
//                             name="receivers"
//                             value={formData.receivers}
//                             onChange={handleChange}
//                             placeholder="Receivers (comma separated)"
//                         />
//                         <button type="submit">Add Transaction</button>
//                     </form>

//                     <h2>Past Transactions</h2>
//                     <ul>
//                         {transactions.length > 0 ? transactions.map(transaction => (
//                             <li key={transaction._id}>
//                                 <strong>{transaction.title}</strong> - ${transaction.amount.toFixed(2)}<br />
//                                 Sender: {transaction.sender}<br />
//                                 Receivers: {transaction.receivers.join(', ')}
//                             </li>
//                         )) : (
//                             <p className="placeholder">No transactions found</p>
//                         )}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default IdGroup;
