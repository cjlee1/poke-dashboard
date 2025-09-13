
import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function StatsRadarChart({ pokemonData, selectedPokemon }) {
  // Calculate average stats
  const avgStats = {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0
  };

  pokemonData.forEach(p => {
    avgStats.hp += p.stats.hp;
    avgStats.attack += p.stats.attack;
    avgStats.defense += p.stats.defense;
    avgStats.specialAttack += p.stats.specialAttack;
    avgStats.specialDefense += p.stats.specialDefense;
    avgStats.speed += p.stats.speed;
  });

  const count = pokemonData.length;
  Object.keys(avgStats).forEach(key => {
    avgStats[key] = Math.round(avgStats[key] / count);
  });

  const datasets = [{
    label: 'Average',
    data: Object.values(avgStats),
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
  }];

  // Add selected Pokemon
  selectedPokemon.forEach((pokemon, index) => {
    const colors = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)'
    ];
    datasets.push({
      label: pokemon.name,
      data: Object.values(pokemon.stats),
      backgroundColor: colors[index],
      borderColor: colors[index].replace('0.2', '1'),
    });
  });

  const data = {
    labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
    datasets: datasets
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1.5, // Prevents overflow on mobile
    plugins: {
      title: {
        display: true,
        text: 'Pokemon Stats Comparison'
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 150
      }
    }
  };

  return (
    <div className="chart-container">
      <Radar data={data} options={options} />
      {selectedPokemon.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          Click on Pokemon below to compare stats
        </p>
      )}
    </div>
  );
}

export default StatsRadarChart;