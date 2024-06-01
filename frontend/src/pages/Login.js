import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
console.log(formData)
    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth/login', formData)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                navigate('/dashboard');
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-black p-8 rounded-lg shadow-md w-96 animate-fade-in">
                <h1 className="text-4xl font-bold mb-6 text-center text-white">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="Email" 
                        className="mb-4 p-3 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white" 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        placeholder="Password" 
                        className="mb-6 p-3 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white" 
                    />
                    <button type="submit" className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-300">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
