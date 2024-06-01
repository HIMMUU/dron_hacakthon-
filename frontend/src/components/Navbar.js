import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-900 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">Expense Manager</div>
                <div>
                    <Link to="/" className="text-white mr-4 hover:text-purple-500 transition duration-300">Home</Link>
                    <Link to="/dashboard" className="text-white mr-4 hover:text-purple-500 transition duration-300">Dashboard</Link>
                    <Link to="/groups" className="text-white hover:text-purple-500 transition duration-300">Groups</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
