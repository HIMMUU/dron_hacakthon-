import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('/api/auth/login', formData)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                navigate('/dashboard');
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col w-1/2">
                <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Email" 
                    className="mb-2 p-2 border border-gray-300" 
                />
                <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Password" 
                    className="mb-2 p-2 border border-gray-300" 
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Login</button>
            </form>
        </div>
    );
};

export default Login;
