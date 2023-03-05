import axios from "axios";

const pokemonsApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export const getPokemons = async (offset = 0) => {
  const response = await pokemonsApi.get(`/pokemon?offset=${offset}&limit=20`);
  return response.data;
};

export const getPokemonByName = async (name: string) => {
  const response = await pokemonsApi.get(`/pokemon/${name}`);
  return response.data;
};

export const getPokemonsByType = async (type: string) => {
  const response = await pokemonsApi.get(`/type/${type}`);
  return response.data;
};

export const getPokemonSpeciesByName = async (name: string) => {
  const response = await pokemonsApi.get(`/pokemon-species/${name}`);
  return response.data;
};
