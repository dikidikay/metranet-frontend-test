import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Layouts/Layout";
import { useInfiniteQuery } from "react-query";
import { getPokemons } from "@/api/pokemonsApi";
import { useRef, useCallback } from "react";
import PokemonCard from "@/components/pages/index/PokemonCard";

export default function Home() {
  const {
    data: pokemons,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery(
    "/pokemon",
    ({ pageParam = 0 }) => getPokemons(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextUrl = lastPage?.next;
        const offsetIndex = nextUrl.indexOf("offset=");
        const offsetValue = nextUrl.substring(
          offsetIndex + 7,
          nextUrl.indexOf("&")
        );

        return lastPage?.next ? offsetValue : undefined;
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
          fetchNextPage();
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  return (
    <>
      <Layout title="Pokedex">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-6">
          {pokemons?.pages?.map((pg) => {
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
          })}
        </div>
      </Layout>
    </>
  );
}
