import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function TypeDistributionChart({ pokemonData, chartType = 'bar' }) {
  // Calculate type distribution
  const typeCount = {};
  pokemonData.forEach(pokemon => {
    pokemon.types.forEach(type => {
      typeCount[type] = (typeCount[type] || 0) + 1;
    });
  });

  // Sort by count
  const sorted = Object.entries(typeCount)
    .sort((a, b) => b[1] - a[1]);

  const chartData = {
    labels: sorted.map(([type]) => type),
    datasets: [{
      label: 'Number of Pokemon',
      data: sorted.map(([, count]) => count),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
        '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF',
        '#4BC0C0', '#FF6384', '#36A2EB', '#FFCE56'
      ]
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1.5, // Prevents overflow on mobile
    plugins: {
      title: {
        display: true,
        text: 'Pokemon Type Distribution'
      }
    }
  };

  return (
    <div className="chart-container">
      {chartType === 'bar' ? (
        <Bar data={chartData} options={options} />
      ) : (
        <Pie data={chartData} options={options} />
      )}
    </div>
  );
}

export default TypeDistributionChart;