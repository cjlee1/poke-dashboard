import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

class PokemonApiService {
  constructor() {
    this.cache = new Map();
  }

  async getPokemonList(limit = 151) {
    const cacheKey = `list-${limit}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    
    const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}`);
    this.cache.set(cacheKey, response.data.results);
    return response.data.results;
  }

  async getPokemonDetails(nameOrId) {
    const cacheKey = `pokemon-${nameOrId}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    
    const response = await axios.get(`${BASE_URL}/pokemon/${nameOrId}`);
    const data = response.data;
    console.log(data)
    // Transform data to what we need
    const processed = {
      id: data.id,
      name: data.name,
      types: data.types.map(t => t.type.name),
      stats: {
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        specialAttack: data.stats[3].base_stat,
        specialDefense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
      },
      sprite: data.sprites.front_default,
      height: data.height,
      weight: data.weight,
    };
    
    this.cache.set(cacheKey, processed);
    return processed;
  }
}

export default new PokemonApiService();