import Layout from "@/components/Layouts/Layout";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { getPokemons, getPokemonsByType } from "@/api/pokemonsApi";
import { useRef, useCallback, useState, useEffect } from "react";
import PokemonCard from "@/components/shared/PokemonCard";
import ModalFilter from "@/components/pages/index/ModalFilter";
import FilterLabel from "@/components/pages/index/FilterLabel";

export default function Home() {
  const [filtered, setFiltered] = useState(() => {
    if (typeof window !== "undefined") {
      const savedFilterType = localStorage.getItem("filterType");
      return savedFilterType !== null ? true : false;
    }
  });
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState(() => {
    if (typeof window !== "undefined") {
      const savedFilterType = localStorage.getItem("filterType");
      return savedFilterType !== null ? savedFilterType : "";
    }
  });
  const [filterLabelText, setFilterLabelText] = useState("");

  const queryClient = useQueryClient();
  /*** FUNCTIONS ***/
  const showModalFilter = () => {
    setIsModalFilterOpen(true);
  };

  const handleOkFilter = () => {
    setIsModalFilterOpen(false);
    setFiltered(true);
    refetch();
    setFilterLabelText(filterType);
    localStorage.setItem("filterType", filterType);
  };

  const handleCancelFilter = () => {
    setIsModalFilterOpen(false);
  };

  const handleResetFilter = () => {
    setIsModalFilterOpen(false);
    setFiltered(false);
    localStorage.removeItem("filterType");
    setFilterType("");
  };

  // Fetch pokemon data by type
  const {
    isLoading,
    isError,
    data: pokemonsFilteredByType,
    refetch,
  } = useQuery({
    queryKey: ["pokemonsFilteredByType", "water"],
    queryFn: () => getPokemonsByType(filterType),
    enabled: filtered,
  });

  // Fetch all pokemon data no filter
  const {
    data: pokemons,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery(
    "/pokemon",
    ({ pageParam = 0 }) => {
      if (filtered) {
        return;
      } else {
        return !filtered && getPokemons(pageParam);
      }
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextUrl = lastPage?.next;
        const offsetIndex = nextUrl?.indexOf("offset=");
        const offsetValue = nextUrl?.substring(
          offsetIndex + 7,
          nextUrl?.indexOf("&")
        );

        return lastPage?.next ? offsetValue : undefined;
      },
      enabled: !filtered,
    }
  );

  // tes
  // tes 2

  // For infinite scroll
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

  /*** EFFECTS ***/
  useEffect(() => {
    const savedFilterType = localStorage.getItem("filterType");
    if (savedFilterType !== null) {
      setFilterType(savedFilterType);
      setFiltered(true);
      setFilterLabelText(savedFilterType);
    }
  }, []);

  return (
    <>
      <Layout title="Pokedex - Home">
        <div className="max-w-screen-xl mx-auto mt-6">
          <ModalFilter
            open={isModalFilterOpen}
            onOk={handleOkFilter}
            onCancel={handleCancelFilter}
            setFilterType={setFilterType}
            filterType={filterType}
          />
          <div className="flex justify-between items-center">
            <div>
              <button
                type="primary"
                onClick={showModalFilter}
                className="bg-slate-500 hover:bg-slate-400 border-0 py-2 px-4 rounded-md cursor-pointer font-bold text-white mr-2"
              >
                Filter by type
              </button>

              <button
                type="primary"
                onClick={handleResetFilter}
                className="bg-slate-500 hover:bg-slate-400 border-0 py-2 px-4 rounded-md cursor-pointer font-bold text-white"
              >
                Reset Filter
              </button>
            </div>

            {filtered && filterType && (
              <FilterLabel filterLabelText={filterLabelText} />
            )}
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-6">
          {/* All pokemons & Infinity scrolling */}
          {!filtered &&
            pokemons &&
            pokemons?.pages?.map((pg) => {
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

          {/* Filtered Pokemons */}
          {filtered &&
            pokemonsFilteredByType &&
            pokemonsFilteredByType?.pokemon?.map((item) => (
              <PokemonCard
                key={item?.pokemon?.name}
                name={item?.pokemon?.name}
              />
            ))}
        </div>
      </Layout>
    </>
  );
}
