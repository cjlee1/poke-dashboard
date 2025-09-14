
import React from 'react'

// summary of stats such as total pokemon based of filtering, pokemon type, selected pokemon for scatter chart
const StatsSummary = ({filteredPokemon,types,selectedPokemon}) => {
  return (
    <div className="stats-summary">
  <div className="stat-card">
    <h3>Total Pokemon</h3>
    <p>{filteredPokemon.length}</p>
  </div>
  <div className="stat-card">
    <h3>Types</h3>
    <p>{types.length}</p>
  </div>
  <div className="stat-card">
    <h3>Selected</h3>
    <p>{selectedPokemon.length}/3</p>
  </div>
</div>
  )
}

export default StatsSummary