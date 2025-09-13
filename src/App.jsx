import React, { useState, useEffect } from "react";
import pokemonApi from "./services/pokemonApi";
import TypeDistributionChart from "./components/TypeDistributionChart";
import StatsRadarChart from "./components/StatsRadarChart";
import PokemonFilter from "./components/PokemonFilter";
import PokemonGrid from "./components/PokemonGrid";
import "./App.css";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Get unique types
  const types = [...new Set(pokemonData.flatMap((p) => p.types))].sort();

  // Filter Pokemon
  const filteredPokemon = pokemonData.filter((pokemon) => {
    const matchesType = !selectedType || pokemon.types.includes(selectedType);
    const matchesSearch =
      !searchTerm ||
      pokemon.name.includes(searchTerm.toLowerCase()) ||
      pokemon.id.toString() === searchTerm;
    return matchesType && matchesSearch;
  });
  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon((prev) => {
      const isSelected = prev.find((p) => p.id === pokemon.id);
      if (isSelected) {
        return prev.filter((p) => p.id !== pokemon.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), pokemon];
      }
      return [...prev, pokemon];
    });
  };
  const [chartType, setChartType] = useState("bar");

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
        const promises = batch.map((p) => pokemonApi.getPokemonDetails(p.name));
        const results = await Promise.all(promises);
        allPokemon.push(...results);
        setProgress(Math.round((allPokemon.length / 151) * 100));
      }

      setPokemonData(allPokemon);
    } catch (err) {
      setError("Failed to load Pokemon data");
    } finally {
      setLoading(false);
    }
  };
  console.log(pokemonData);

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
 <PokemonFilter
          types={types}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          search={searchTerm}
          onSearchChange={setSearchTerm}
        />
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-controls">
            <button onClick={() => setChartType("bar")}>Bar</button>
            <button onClick={() => setChartType("pie")}>Pie</button>
          </div>
          <TypeDistributionChart
            pokemonData={pokemonData}
            chartType={chartType}
          />
         
        </div>
         <div className="chart-card">
            <StatsRadarChart
              pokemonData={pokemonData}
              selectedPokemon={selectedPokemon}
            />
          </div>
      </div>
      <div className="chart-card">
       

        <PokemonGrid
          pokemonData={filteredPokemon.slice(0, 151)} // Limit display
          selectedPokemon={selectedPokemon}
          onPokemonSelect={handlePokemonSelect}
        />
      </div>
    </div>
  );
}

export default App;
