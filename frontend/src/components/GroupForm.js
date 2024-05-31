import React, { useState } from 'react';
import axios from 'axios';

const AddGroupForm = () => {
    const [name, setName] = useState('');
    const [members, setMembers] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/groups/create', {
                name,
                members: members.split(',').map(member => member.trim()), // Assuming members are comma-separated
            });
            setMessage(response.data.message);
            setName('');
            setMembers('');
        } catch (err) {
            setMessage(err.response.data.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add New Group</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Group Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="members" className="block text-sm font-medium text-gray-700">Members (comma-separated emails):</label>
                    <input
                        type="text"
                        id="members"
                        value={members}
                        onChange={(e) => setMembers(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Add Group</button>
            </form>
            {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
        </div>
    );
};

export default AddGroupForm;
