import React from 'react';
import Dashboard from '../components/DashboardMain';
import ExpenseChart from '../components/ExpenseChart';
import GroupList from '../components/GroupList';
import TransactionList from '../components/TransactionList';
import GroupForm from '../components/GroupForm';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <Dashboard />
     
      <div className="my-4">
        <GroupList />
        
      </div>
      <div className="my-4">
        <GroupForm />
        
      </div>
      <div className="my-4">
        <TransactionList />
      </div>
    </div>
  );
};

export default Home;
