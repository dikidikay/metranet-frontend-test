import Layout from "@/components/Layouts/Layout";
import React from "react";
import PokemonDetailCard from "@/components/pages/pokemon-detail/PokemonDetailCard";

const PokemonDetail = () => {
  return (
    <Layout title="Pokemon Detail">
      <PokemonDetailCard />
    </Layout>
  );
};

export default PokemonDetail;
