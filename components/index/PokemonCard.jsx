import { getPokemonByName } from "@/api/pokemonsApi";
import { Card, Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { bgType } from "@/helper/helper";

const PokemonCard = React.forwardRef(({ name }, ref) => {
  const {
    isLoading,
    isError,
    error,
    data: pokemon,
  } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => getPokemonByName(name),
  });

  return (
    <Link href={`/pokemon-detail`} className="no-underline">
      <div className="block rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all">
        <Skeleton loading={isLoading}>
          <div ref={ref ? ref : undefined}>
            <div className=" bg-slate-300 rounded-t-lg">
              <Image
                src={pokemon?.sprites?.front_default}
                width="999"
                height="999"
                className="w-full h-auto"
              />
            </div>
            {/* Body */}
            <div className="p-4">
              <p className=" text-slate-500 font-bold mb-3">
                {"#" +
                  ("0000" + pokemon?.id).slice(-4, -1) +
                  String(pokemon?.id).slice(-1)}
              </p>
              <p className=" text-slate-700 font-semibold capitalize mb-1">
                {pokemon?.name}
              </p>
              <div className="flex gap-1">
                {pokemon?.types?.map(({ slot, type }) => {
                  const bg = bgType(type?.name);

                  return (
                    <p
                      key={slot}
                      className={`${bg} px-2 py-1 rounded-lg capitalize text-white`}
                    >
                      {type.name}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </Skeleton>
      </div>
    </Link>
  );
});

export default PokemonCard;
