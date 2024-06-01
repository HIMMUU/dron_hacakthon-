import React from 'react';
import ExpenseChart from './ExpenseChart';
import GroupList from './GroupList';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';

const DashboardMain = () => {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <ExpenseChart /> */}
                <GroupList />
                <TransactionList />
            </div>
            <TransactionForm />
        </div>
    );
};

export default DashboardMain;
