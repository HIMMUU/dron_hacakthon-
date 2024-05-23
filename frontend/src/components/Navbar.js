import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between">
                <div className="text-white text-lg">Expense Manager</div>
                <div>
                    <Link to="/" className="text-white mr-4">Home</Link>
                    <Link to="/dashboard" className="text-white mr-4">Dashboard</Link>
                    <Link to="/groups" className="text-white">Groups</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
