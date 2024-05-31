import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DashboardMain from './components/DashboardMain';
import GroupForm from './components/GroupForm';
import GroupTransactions from './components/GroupTransaction';
import SplitExpenses from './components/SplitExpenses';
import Login from './pages/Login';
import Register from './pages/Register';
import Group from './pages/Group';
import GroupTransactionForm from './components/GroupTransactionForm';
const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<DashboardMain />} />
                    <Route path="/groups" element={<Group />} />
                    <Route path="/groups/new" element={<GroupForm />} />
                    <Route path="/groups/:groupId" element={<GroupTransactions />} /> {/* Updated route */}
                    <Route path="/groups/:groupId/transactions" element={<GroupTransactionForm />} /> {/* New route */}
                    <Route path="/groups/:groupId/split" element={<SplitExpenses />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
