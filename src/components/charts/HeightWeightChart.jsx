import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import pokemonApi from "../../services/pokemonApi";
import { typeColors,baseChartOptions } from "./ChartConstants";
import { createChartOptions } from './utils';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

// Chart to show height and weight of the different pokemon and it is limited to 10 types in line 32
function HeightWeightChart({ pokemonData }) {
  const typeGroups = {};

  pokemonData.forEach((pokemon) => {
    const primaryType = pokemon.types[0];
    if (!typeGroups[primaryType]) {
      typeGroups[primaryType] = [];
    }
    typeGroups[primaryType].push({
      x: pokemon.height / 10, // Convert to meters
      y: pokemon.weight / 10, // Convert to kg
      name: pokemon.name,
    });
  });

  const datasets = Object.entries(typeGroups)
    .slice(0, 10) // Limit to top 10 types for clarity
    .map(([type, data]) => ({
      label: type.charAt(0).toUpperCase() + type.slice(1),
      data: data,
      backgroundColor: (typeColors[type] || "#68A090") + "80",
      borderColor: typeColors[type] || "#68A090",
      borderWidth: 1,
      pointRadius: 5,
      pointHoverRadius: 7,
    }));

  const chartData = { datasets };

  const options = createChartOptions({
    plugins: {
      title: {
        text: "Height vs Weight Correlation",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const point = context.raw;
            return [
              `${context.dataset.label}`,
              `${point.name}`,
              `Height: ${point.x}m`,
              `Weight: ${point.y}kg`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "Height (meters)",
        },
        min: 0,
        max: 4,
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "Weight (kg)",
        },
        min: 0,
        max: 500,
      },
    },
  });

  return (
    <div className="chart-container">
      <Scatter data={chartData} options={options} />
    </div>
  );
}

export default HeightWeightChart;
