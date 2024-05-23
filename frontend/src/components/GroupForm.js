import React, { useState } from 'react';
import axios from 'axios';

const GroupForm = () => {
    const [formData, setFormData] = useState({ name: '', members: '' });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('/api/groups/add', {
            ...formData,
            members: formData.members.split(',').map(email => email.trim())
        })
        .then(res => {
            setFormData({ name: '', members: '' });
            // Handle success, e.g., update the group list
        })
        .catch(err => console.error(err));
    };

    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Create Group</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Group Name" 
                    className="mb-2 p-2 border border-gray-300" 
                />
                <input 
                    type="text" 
                    name="members" 
                    value={formData.members}
                    onChange={handleChange} 
                    placeholder="Members (comma separated emails)" 
                    className="mb-2 p-2 border border-gray-300" 
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Create Group</button>
            </form>
        </div>
        );
    };
    
    export default GroupForm;
    