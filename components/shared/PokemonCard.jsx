import { getPokemonByName } from "@/api/pokemonsApi";
import { Skeleton, notification } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import noImage from "@/assets/images/noimage.png";
import {
  StarOutlined,
  StarFilled,
  InfoCircleOutlined,
} from "@ant-design/icons";
import PokemonContext from "@/context/PokemonContext";

const PokemonCard = React.forwardRef(({ name }, ref) => {
  notification.config({
    placement: "top",
    top: 5,
    duration: 1.5,
    zIndex: 1000,
  });

  const { pokemonFavoriteList, setPokemonFavoriteList } =
    useContext(PokemonContext);
  const [isFavorited, setIsFavorited] = useState(() =>
    pokemonFavoriteList.some((favorite) => favorite === name)
  );

  const handleClickFavorite = (e) => {
    e.preventDefault();

    const isAlreadyFavorited = pokemonFavoriteList.some(
      (favoritePokemon) => favoritePokemon === name
    );

    if (isAlreadyFavorited) {
      notification.open({
        message: "Removed from favorite",
        icon: <InfoCircleOutlined />,
        style: {
          width: 300,
          height: 65,
        },
      });

      setPokemonFavoriteList((prevList) =>
        prevList.filter((favoritePokemon) => favoritePokemon !== name)
      );
      setIsFavorited(false);
    } else {
      notification.open({
        message: "Added to favorite",
        icon: <InfoCircleOutlined />,
        style: {
          width: 300,
          height: 65,
        },
      });

      setPokemonFavoriteList((prevList) => [...prevList, name]);
      setIsFavorited(true);
    }
  };

  useEffect(() => {
    localStorage.setItem(
      "favoritePokemon",
      JSON.stringify(pokemonFavoriteList)
    );
  }, [pokemonFavoriteList]);

  const { isLoading, data: pokemon } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => getPokemonByName(name),
  });

  return (
    <Link href={`/pokemon-detail/${name}`} className="no-underline">
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
              <div className="mb-3 flex justify-between">
                <p className=" text-slate-500 font-bold ">
                  {"#" +
                    ("0000" + pokemon?.id).slice(-4, -1) +
                    String(pokemon?.id).slice(-1)}
                </p>
                <button
                  className="border-0 bg-white"
                  onClick={handleClickFavorite}
                >
                  {!isFavorited ? (
                    <StarOutlined style={{ fontSize: "16px" }} />
                  ) : (
                    <StarFilled
                      style={{ fontSize: "16px", color: "#D5AB55" }}
                    />
                  )}
                </button>
              </div>
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
