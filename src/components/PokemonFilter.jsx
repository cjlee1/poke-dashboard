import React from 'react';

// filter to change type of pokemon and also search thru cached results of pokemon data
function PokemonFilter({ types, selectedType, onTypeChange, search, onSearchChange }) {
  return (
    <div className="filter-container">
      <div className="filter-group">
        <label>Filter by Type:</label>
        <select
          className="filter-select"
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <option value="">All Types</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Search:</label>
        <input
          className="filter-input"
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