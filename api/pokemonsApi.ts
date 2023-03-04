import axios from "axios";

// "next": "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",

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
