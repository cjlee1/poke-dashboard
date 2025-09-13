import React, { useState, useEffect } from 'react';
import pokemonApi from './services/pokemonApi';
import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPokemonData();
  }, []);

  const loadPokemonData = async () => {
    try {
      setLoading(true);
      const list = await pokemonApi.getPokemonList(151);
      
      // Batch fetch to avoid rate limiting
      const allPokemon = [];
      const batchSize = 20;
      
      for (let i = 0; i < list.length; i += batchSize) {
        const batch = list.slice(i, i + batchSize);
        const promises = batch.map(p => 
          pokemonApi.getPokemonDetails(p.name)
        );
        const results = await Promise.all(promises);
        allPokemon.push(...results);
        setProgress(Math.round((allPokemon.length / 151) * 100));
      }
      
      setPokemonData(allPokemon);
    } catch (err) {
      setError('Failed to load Pokemon data');
    } finally {
      setLoading(false);
    }
  };
  console.log(pokemonData)

  if (loading) {
    return (
      <div className="container">
        <h1>Loading Pokemon...</h1>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      </div>
    );
  }

    if (error) {
    return (
      <div className="container">
        <div className="header">
          <h1>Pokémon Analytics Dashboard</h1>
          <p>Interactive data visualization and analysis platform</p>
        </div>
        <div className="error">{error}</div>
        <button onClick={loadPokemonData}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Pokemon Analytics Dashboard</h1>
      <p>Loaded {pokemonData.length} Pokemon</p>
    </div>
  );
}

export default App;