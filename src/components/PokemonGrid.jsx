import React from 'react';

function PokemonGrid({ pokemonData, selectedPokemon, onPokemonSelect }) {
  return (
    <div className="pokemon-grid">
      {pokemonData.map(pokemon => (
        <div
          key={pokemon.id}
          className={`pokemon-card ${
            selectedPokemon.find(p => p.id === pokemon.id) ? 'selected' : ''
          }`}
          onClick={() => onPokemonSelect(pokemon)}
        >
          <img src={pokemon.sprite} alt={pokemon.name} />
          <h3>{pokemon.name}</h3>
          <div className="types">
            {pokemon.types.map(type => (
              <span key={type} className={`type ${type}`}>
                {type}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PokemonGrid;