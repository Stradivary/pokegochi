import axios from 'axios';

class PokemonRepository {
  private baseUrl: string = 'https://pokeapi.co/api/v2/';

  async getPokemonById(id: number, params?: object) {
    try {
      const response = await axios.get(`${this.baseUrl}pokemon/${id}`, { params });
      return response.data;
    } catch (error) {
      // Handle or throw error
    }
  }

  async getPokemonByName(name: string, params?: object) {
    try {
      const response = await axios.get(`${this.baseUrl}pokemon/${name}`, { params });
      return response.data;
    } catch (error) {
      // Handle or throw error
    }
  }

  async getPokemonByType(type: string, params?: object) {
    try {
      const response = await axios.get(`${this.baseUrl}type/${type}`, { params });
      return response.data.pokemon.map((p: any) => p.pokemon);
    } catch (error) {
      // Handle or throw error
    }
  }

  async filterPokemonByName(name: string, params?: object) {
    try {
      const response = await axios.get(`${this.baseUrl}pokemon/${name}`, { params });
      return response.data;
    } catch (error) {
      // Handle or throw error
    }
  }

  async getPokemonSpecies(id: number, params?: object) {
    try {
      const response = await axios.get(`${this.baseUrl}pokemon-species/${id}`, { params });
      return response.data;
    } catch (error) {
      // Handle or throw error
    }
  }

  async getPokemonEvolutionChain(id: number, params?: object) {
    try {
      const response = await axios.get(`${this.baseUrl}evolution-chain/${id}`, { params });
      return response.data;
    } catch (error) {
      // Handle or throw error
    }
  }
}

export default PokemonRepository;