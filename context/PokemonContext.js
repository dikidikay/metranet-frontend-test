import { createContext, useState, useEffect } from "react";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  let pokemonFavoriteListFromLocal;

  if (typeof window !== "undefined") {
    // Perform localStorage action
    pokemonFavoriteListFromLocal = JSON.parse(
      localStorage.getItem("favoritePokemon") || "[]"
    );
  }

  const [pokemonFavoriteList, setPokemonFavoriteList] = useState(
    pokemonFavoriteListFromLocal
  );

  return (
    <PokemonContext.Provider
      value={{
        pokemonFavoriteList,
        setPokemonFavoriteList,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonContext;
