import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';

const ExpenseChart = () => {
    // Sample data for charts
    const data = {
        labels: ['Entertainment', 'Travel', 'Food'],
        datasets: [{
            label: 'Expenses',
            data: [300, 500, 200],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }]
    };

    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Expense Chart</h2>
            <Pie data={data} />
            <Bar data={data} className="mt-4" />
        </div>
    );
};

export default ExpenseChart;
