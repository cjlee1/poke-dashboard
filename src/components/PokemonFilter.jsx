import React from 'react';

function PokemonFilter({ types, selectedType, onTypeChange, search, onSearchChange }) {
  return (
    <div className="filter-container">
      <div className="filter-group">
        <label>Filter by Type:</label>
        <select value={selectedType} onChange={(e) => onTypeChange(e.target.value)}>
          <option value="">All Types</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label>Search:</label>
        <input
          type="text"
          placeholder="Pokemon name or ID..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default PokemonFilter;