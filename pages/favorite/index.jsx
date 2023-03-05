import Layout from "@/components/Layouts/Layout";
import PokemonContext from "@/context/PokemonContext";
import React, { useState, useEffect, useContext } from "react";
import PokemonCard from "@/components/shared/PokemonCard";

const FavoritePokemon = () => {
  const { pokemonFavoriteList, setPokemonFavoriteList } =
    useContext(PokemonContext);

  useEffect(() => {
    localStorage.setItem(
      "favoritePokemon",
      JSON.stringify(pokemonFavoriteList)
    );
  }, [pokemonFavoriteList]);

  return (
    <Layout title="Pokedex - Favorite">
      {pokemonFavoriteList?.length > 0 ? (
        <>
          <h1 className="text-center mt-8">Favorite Pokemons</h1>

          <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-6">
            {/* Filtered Pokemons */}
            {pokemonFavoriteList?.map((item) => (
              <PokemonCard key={item} name={item} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-[50px] text-center mt-20">No Favorite</p>
      )}
    </Layout>
  );
};

export default FavoritePokemon;
