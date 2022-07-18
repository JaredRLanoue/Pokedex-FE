import React from "react";
import Types from "./Types";
import { Link } from "react-router-dom";

export default function Pokemon({ pokemon: { id, name, types } }) {
  const pokemonImage = getPokemonImage(id);

  function getPokemonImage(id) {
    return (
      `https://assets.pokemon.com/assets/cms2/img/pokedex/full/` +
      id.toString().padStart(3, "0") +
      ".png"
    );
  }

  return (
    <Link to={`/pokedex/${id}`}>
      <div className="pokemon">
        <div className="pokemon-title">{name}</div>
        <img className="pokemon-image" src={pokemonImage} alt={name} />
        <Types types={types} />
      </div>
    </Link>
  );
}
