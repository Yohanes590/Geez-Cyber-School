import React from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Math', completed: 8, pending: 2, overdue: 1 },
  { name: 'Physics', completed: 6, pending: 4, overdue: 2 },
  { name: 'Chemistry', completed: 9, pending: 1, overdue: 0 },
  { name: 'English', completed: 7, pending: 3, overdue: 1 },
  { name: 'Biology', completed: 5, pending: 5, overdue: 3 },
  { name: 'History', completed: 10, pending: 0, overdue: 0 },
];

const AssignmentChart = () => {
  return (
    <ResponsiveContainer width="95%" height={300}>
      <ComposedChart
        layout="vertical"
        data={data}
        margin={{
          top: 20,
          right: 30,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#e5e7eb" /> 
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" scale="band" />
        <Tooltip />
        <Legend />

        <Area dataKey="overdue" fill="#93c5fd" stroke="#3b82f6" />

        <Bar dataKey="pending" barSize={20} fill="#60a5fa" /> 

        <Line dataKey="completed" stroke="#2563eb" strokeWidth={2} /> 
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default AssignmentChart;
