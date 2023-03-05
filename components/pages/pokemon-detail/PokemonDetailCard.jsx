import React from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { getPokemonByName, getPokemonSpeciesByName } from "@/api/pokemonsApi";
import Image from "next/image";
import { Skeleton, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const PokemonDetailCard = () => {
  const router = useRouter();
  const name = router?.query?.name;

  const { isLoading: pokemonLoading, data: pokemon } = useQuery(
    name && {
      queryKey: ["pokemon", name],
      queryFn: () => getPokemonByName(name),
    }
  );

  const { isLoading: pokemonSpeciesLoading, data: pokemonSpecies } = useQuery(
    name && {
      queryKey: ["pokemon-species", name],
      queryFn: () => getPokemonSpeciesByName(name),
    }
  );

  return (
    <div className="max-w-screen-xl mx-auto mt-6">
      {pokemonLoading || pokemonSpeciesLoading ? (
        <div className="flex items-center justify-center h-[500px]">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row shadow-md rounded-lg">
          {/* Image Start */}
          <div className="w-full md:w-1/2 bg-slate-300 flex justify-center items-center rounded-t-lg md:rounded-l-lg md:rounded-r-none">
            <Image
              src={pokemon?.sprites?.front_default}
              width="0"
              height="0"
              className="w-auto h-[300px] md:h-[500px]"
              alt={name}
              unoptimized
            />
          </div>
          {/* Image End */}
          {/* Content Start */}
          <div className="w-full md:w-1/2   bg-slate-100 rounded-b-lg md:rounded-l-none md:rounded-r-lg  p-3 text-center">
            <h1 className="capitalize text-base md:text-2xl mb-4">
              <span className="mr-2">{name}</span>
              <span className=" text-slate-500 font-bold">
                {"#" +
                  ("0000" + pokemon?.id).slice(-4, -1) +
                  String(pokemon?.id).slice(-1)}
              </span>
            </h1>

            <p className="mb-10">
              {pokemonSpecies?.flavor_text_entries?.[0]?.flavor_text}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div>
                <p className="font-bold mb-3">Height</p>
                <p>{pokemon?.height / 10} M</p>
              </div>
              <div>
                <p className="font-bold mb-3">Weight</p>
                <p>{pokemon?.weight / 10} Kg</p>
              </div>

              <div>
                <p className="font-bold mb-3">Abilities</p>
                <p className="capitalize">
                  {pokemon?.abilities?.map((i) => i.ability.name).join(", ")}
                </p>
              </div>
              <div>
                <p className="font-bold mb-3">Habitat</p>
                <p className="capitalize">{pokemonSpecies?.habitat?.name}</p>
              </div>
            </div>

            <div className="flex justify-between md:mx-6 mb-10 ">
              {pokemon?.stats?.map((item) => (
                <div>
                  <p className="font-bold mb-3 capitalize text-[10px] md:text-xs ">
                    {item?.stat?.name}
                  </p>
                  <p className="text-[10px] md:text-xs">{item?.base_stat}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-5 justify-center items-center">
              {pokemon?.types?.map(({ slot, type }) => {
                let bgType;
                if (type?.name === "normal") {
                  bgType = "bg-[#a4acaf]";
                } else if (type?.name === "fighting") {
                  bgType = "bg-[#d56723]";
                } else if (type?.name === "flying") {
                  bgType = "bg-[#3dc7ef]";
                } else if (type?.name === "poison") {
                  bgType = "bg-[#b97fc9]";
                } else if (type?.name === "ground") {
                  bgType = "bg-[#f7de3f]";
                } else if (type?.name === "rock") {
                  bgType = "bg-[#a38c21]";
                } else if (type?.name === "bug") {
                  bgType = "bg-[#729f3f]";
                } else if (type?.name === "ghost") {
                  bgType = "bg-[#7b62a3]";
                } else if (type?.name === "steel") {
                  bgType = "bg-[#9eb7b8]";
                } else if (type?.name === "fire") {
                  bgType = "bg-[#fd7d24]";
                } else if (type?.name === "water") {
                  bgType = "bg-[#4592c4]";
                } else if (type?.name === "grass") {
                  bgType = "bg-[#9bcc50]";
                } else if (type?.name === "electric") {
                  bgType = "bg-[#eed535]";
                } else if (type?.name === "psychic") {
                  bgType = "bg-[#f366b9]";
                } else if (type?.name === "ice") {
                  bgType = "bg-[#51c4e7]";
                } else if (type?.name === "dragon") {
                  bgType = "bg-[#f16e57] ";
                } else if (type?.name === "dark") {
                  bgType = "bg-[#707070] ";
                } else if (type?.name === "fairy") {
                  bgType = "bg-[#fdb9e9] ";
                } else {
                }

                return (
                  <p
                    key={slot}
                    className={`${bgType} px-6 py-3 rounded-md capitalize text-white`}
                  >
                    {type.name}
                  </p>
                );
              })}
            </div>
          </div>
          {/* Content End */}
        </div>
      )}
    </div>
  );
};

export default PokemonDetailCard;
