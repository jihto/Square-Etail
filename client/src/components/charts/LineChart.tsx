import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables, LineElement, PointElement } from 'chart.js';

ChartJS.register(...registerables, LineElement, PointElement);

const LineChart: React.FC<{ values?: number[], type: TypeChart }> = ({
    values,
    type
}) => {
    const data = {
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        datasets: [
            {
                label: type || 'Sold',
                data: values || [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(75, 192, 192, 0.7)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };
    const options = {
        indexAxis: 'x' as const,
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
    }; 
    return <Line data={data} options={options} style={{ width: "100%" }}/>;
};

export default LineChart;
