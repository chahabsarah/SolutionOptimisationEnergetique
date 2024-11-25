import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Area, defs, linearGradient, stop } from 'recharts';
import { fetchData } from '../api';

const fieldNames = {
    power: 'Puissance',
    voltage: 'Voltage',
    current: 'Current',
    energy: 'Energie',
    totalEnergy: 'Energie totale',
    frequency: 'Frequency',
    pf: 'Facteur de puissance',
    temperatureC: 'Temperature (°C)',
};

const DataChart = ({ sensor, field }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const gradientId = 'colorGradient';

    useEffect(() => {
        const getData = async () => {
            try {
                const fetchedData = await fetchData(sensor, field);
                const formattedData = fetchedData.map(item => ({
                    ...item,
                    name: fieldNames[field],
                    _time: new Date(item._time).toLocaleString(),
                }));
                setData(formattedData);
            } catch (err) {
                setError(err);
            }
        };
        getData();
    }, [sensor, field]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (data.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <ResponsiveContainer width="100%" height={200} >
            <LineChart data={data}>
                {/* Gradient Definition */}
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF3D71" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="#FF1744" stopOpacity={0} />
                    </linearGradient>
                </defs>

                {/* X and Y Axis */}
                <XAxis dataKey="_time" stroke="#9E9E9E" tick={{ fontSize: 12 }} />
                <YAxis stroke="#9E9E9E" tick={{ fontSize: 12 }} />

                {/* Tooltip Styling */}
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#1E1E2F',
                        borderRadius: '10px',
                        border: 'none',
                        color: '#FFFFFF',
                    }}
                    labelStyle={{ color: '#FF3D71' }}
                    cursor={{ stroke: '#FF1744', strokeWidth: 2 }}
                />

                <Legend />

                {/* Area for Gradient Fill */}
                <Area
                    type="monotone"
                    dataKey="_value"
                    fill={`url(#${gradientId})`}
                    stroke="none"
                />

                {/* Line with Gradient Stroke */}
                <Line
                    type="monotone"
                    dataKey="_value"
                    name={fieldNames[field]}
                    stroke="#FF3D71"
                    strokeWidth={2}
                    dot={{ r: 5, fill: '#FF3D71', stroke: '#FF1744', strokeWidth: 0.3 }}
                    activeDot={{ r: 9, strokeWidth: 0.7, stroke: '#FF3D71' }}
                    animationDuration={2000}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default DataChart;