import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GroupList = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/groups')
            .then(res => setGroups(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Groups</h2>
            <div>
                {groups.map(group => (
                    <div key={group._id} className="border p-4 mb-2">
                        <p><strong>Name:</strong> {group.name}</p>
                        <p><strong>Members:</strong> {group.members.join(',')}</p>
                        <Link to={`/groups/${group._id}/IdGroup`} className="text-blue-500">View Group</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroupList;
