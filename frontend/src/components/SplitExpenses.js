import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SplitExpenses = () => {
    const { groupId } = useParams();
    const [members, setMembers] = useState([]);
    const [amount, setAmount] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/groups/${groupId}`)
            .then(res => setMembers(res.data.members))
            .catch(err => console.error(err));
    }, [groupId]);

    const handleAmountChange = e => {
        setAmount(e.target.value);
    };

    const handleMemberSelection = e => {
        const member = e.target.value;
        if (selectedMembers.includes(member)) {
            setSelectedMembers(selectedMembers.filter(m => m !== member));
        } else {
            setSelectedMembers([...selectedMembers, member]);
        }
    };

    const handleSplit = () => {
        if (amount === '' || selectedMembers.length === 0) return;
        const splitAmount = amount / selectedMembers.length;
        selectedMembers.forEach(member => {
            axios.post(`http://localhost:5000/api/groups/${groupId}/transactions/add`, {
                title: 'Split Expense',
                amount: splitAmount,
                category: 'Shared',
                receiver: member
            })
            .then(res => console.log(res.data))
            .catch(err => console.error(err));
        });
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Split Expenses</h1>
            <div className="flex flex-col mb-4">
                <input type="number" value={amount} onChange={handleAmountChange} placeholder="Total Amount" className="mb-2 p-2 border border-gray-300" />
                <div className="mb-2 p-2 border border-gray-300">
                    <h2 className="text-lg font-bold mb-2">Select Members to Split</h2>
                    {members.map(member => (
                        <div key={member} className="mb-1">
                            <label>
                                <input type="checkbox" value={member} onChange={handleMemberSelection} />
                                <span className="ml-2">{member}</span>
                            </label>
                        </div>
                    ))}
                </div>
                <button onClick={handleSplit} className="bg-blue-500 text-white py-2 px-4 rounded">Split</button>
            </div>
        </div>
    );
};

export default SplitExpenses;
