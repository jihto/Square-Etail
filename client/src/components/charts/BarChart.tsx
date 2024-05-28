import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart: React.FC<{ values?: number[], type: TypeChart }> = ({
    values
}) => {  
    const data = {
        labels: [
            'Week 1',
            'Week 2',
            'Week 3',
            'Week 4',  
        ],
        datasets: [
            {
                label: 'Another week',
                data: values || [12, 19, 3, 5, 2, 3],
                backgroundColor: (context: any) => {
                    const index = context.dataIndex;
                    return index === 3 ? 'rgba(255, 99, 132, 0.7)' : 'rgba(75, 192, 192, 0.7)'; // August bar in red
                },
                borderColor: (context: any) => {
                    const index = context.dataIndex;
                    return index === 3 ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)'; // August bar border in red
                },
                borderWidth: 1,
            },   
            {
                label: 'Current week',
                data: [],
                backgroundColor: "rgba(255, 99, 132, 0.7)"
            },
        ],
    };
    const options = {
        indexAxis: 'y' as const,
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: { 
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: false, 
            }, 
        },
        scales: {
            y: {
                ticks: {
                    beginAtZero: true,
                    display: true,
                },
            },
        },
    }; 
    return <Bar data={data} options={options} style={{ width: "100%" }}/>;
};

export default BarChart;
