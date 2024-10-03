import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export interface Pokemon {
  id: number;
  name: string;
  url: string;
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

// Função: Obtem lista de Pokémons
export const getPokemonList = async (limit: number, offset: number) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: {
        limit,
        offset,
      },
    });
    return response;
  } catch (error) {
    console.error('Erro ao buscar a lista de Pokémons:', error);
    throw error;
  }
};

// Função: Obtem detalhes do Pokémon
export const getPokemonDetails = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error(`Erro ao buscar os detalhes do Pokémon com id ${id}:`, error);
    throw error;
  }
};
