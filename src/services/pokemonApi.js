import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * This service handles all communication with the PokeAPI and manages caching
 * to reduce unnecessary API calls and improve performance.
 */
class PokemonApiService {
  constructor() {
    // This cache stores API responses to avoid redundant network requests
    this.cache = new Map();
  }

  // Fetches a list of Pokemon from the API.
   
  async getPokemonList(limit = 151) {
    // Create a unique cache key based on the limit parameter
    const cacheKey = `list-${limit}`;

    // Check if we already have this data cached
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Make the API request to get the list of Pokemon
    const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}`);

    // Store the results in our cache for next time
    this.cache.set(cacheKey, response.data.results);

    return response.data.results;
  }

// Fetches detailed information about a specific Pokemon.

  async getPokemonDetails(nameOrId) {
    // Create a unique cache key for this specific Pokemon
    const cacheKey = `pokemon-${nameOrId}`;

    // Check if we already have this Pokemon's data cached
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Fetch the full Pokemon data from the API
    const response = await axios.get(`${BASE_URL}/pokemon/${nameOrId}`);
    const data = response.data;


    const processed = {
      id: data.id,
      name: data.name,
      // Extract just the type names from the nested type objects
      types: data.types.map(t => t.type.name),
      // Convert the stats array into a more readable object structure
      stats: {
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        specialAttack: data.stats[3].base_stat,
        specialDefense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
      },
      // Use the front-facing default sprite image
      sprite: data.sprites.front_default,
      // Height is in decimeters, weight is in hectograms from the API
      height: data.height,
      weight: data.weight,
    };

    // Cache the processed data for future use
    this.cache.set(cacheKey, processed);

    return processed;
  }
}


export default new PokemonApiService();