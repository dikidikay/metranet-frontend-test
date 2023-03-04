import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Layouts/Layout";
import { useInfiniteQuery } from "react-query";
import { getPokemons } from "@/api/pokemonsApi";
import { useRef, useCallback, useState } from "react";
import PokemonCard from "@/components/index/PokemonCard";

export default function Home() {
  const [offsetParam, setOffsetParam] = useState(0);

  const {
    data: pokemons,
    fetchNextPage, //function
    hasNextPage, // boolean
    isFetchingNextPage, // boolean
    status,
    error,
  } = useInfiniteQuery(
    "/pokemon",
    ({ pageParam = 0 }) => getPokemons(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.next ? offsetParam + 20 : undefined;
      },
    }
  );

  const intObserver = useRef();

  const lastPostRef = useCallback(
    (post) => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          setOffsetParam((prev) => prev + 20);
          fetchNextPage();
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  const content = pokemons?.pages?.map((pg) => {
    return pg?.results.map((pokemon, i) => {
      if (pg?.results?.length === i + 1) {
        return (
          <PokemonCard
            key={pokemon.name}
            ref={lastPostRef}
            name={pokemon.name}
          />
        );
      }
      return <PokemonCard key={pokemon.name} name={pokemon.name} />;
    });
  });

  return (
    <>
      <Layout title="Pokedex">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-6 p-3">
          {content}
        </div>
      </Layout>
    </>
  );
}
