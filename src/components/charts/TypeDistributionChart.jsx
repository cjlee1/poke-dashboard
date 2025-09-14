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
import {  typeColors } from './ChartConstants';
import { createChartOptions } from './utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
// create a type distribution chart of different pokemon types and also changeable to pie or bar chart
function TypeDistributionChart({ pokemonData, chartType = 'bar' }) {
  // Calculate type distribution and create chart from distribution
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
    labels: sorted.map(([type]) => type.charAt(0).toUpperCase() + type.slice(1)),
    datasets: [{
      label: 'Number of Pokemon',
      data: sorted.map(([, count]) => count),
      backgroundColor: sorted.map(([type]) => (typeColors[type] || '#68A090') + '80'),
      borderColor: sorted.map(([type]) => typeColors[type] || '#68A090'),
      borderWidth: 1
    }]
  };

  const options = createChartOptions({
    plugins: {
      title: {
        text: 'Pokemon Type Distribution'
      }
    }
  });

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