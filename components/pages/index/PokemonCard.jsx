import { getPokemonByName } from "@/api/pokemonsApi";
import { Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import noImage from "@/assets/images/noimage.png";

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
    <Link
      href={`/pokemon-detail/${name}`}
      className="no-underline"
      title={name}
    >
      <div className="block rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all">
        <Skeleton
          loading={isLoading}
          active
          title={{ style: { marginLeft: "10px" } }}
          avatar={{
            shape: "square",
            style: { width: "100%", height: "200px" },
          }}
          paragraph={{
            rows: 2,
          }}
          className="flex flex-col"
        >
          <div ref={ref ? ref : undefined}>
            <div className=" bg-slate-300 rounded-t-lg">
              <Image
                src={
                  pokemon?.sprites?.front_default ??
                  pokemon?.sprites?.other?.home?.front_default ??
                  noImage
                }
                width="0"
                height="0"
                className="w-full h-auto"
                alt={name}
                unoptimized
                priority
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
                      className={`${bgType} px-2 py-1 rounded-lg capitalize text-white`}
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

PokemonCard.displayName = "PokemonCard";
export default PokemonCard;
