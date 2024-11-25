// src/components/TemperaturePieChart.js
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import { fetchData } from '../api';

const TemperaturePieChart = ({ field }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const fetchedData = await fetchData(field);
                setData(fetchedData);
            } catch (err) {
                setError(err);
            }
        };
        getData();
    }, [field]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (data.length === 0) {
        return <div>Loading...</div>;
    }

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

    return (
        <PieChart width={400} height={300}>
            <Pie
                data={data}
                dataKey="_value"
                nameKey="_time"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                label
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
};

export default TemperaturePieChart;
