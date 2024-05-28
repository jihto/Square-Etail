import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import 'chart.js/auto';  
ChartJS.register(CategoryScale, LinearScale,BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
        data: [300, 50, 100,40, 30, 2, 50, 50,34,5, 10.5, 40],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#9966FF', '#4BC0C0', '#FF9F40', '#FF6633', '#FFBD33', '#83F52C', '#8C9EFF', '#D35EFF', '#9370DB' ],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};

const PieChart = () => {
  return (
    <div className='px-10'> 
        <Pie data={data} />
    </div>
  );
};

export default PieChart;