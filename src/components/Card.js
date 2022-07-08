import React from "react";
import { useNavigate } from "react-router-dom";
import Types from "./Types";

export default function Card({pokemon: {id, name, types}, page}) {
  const navigate = useNavigate();
  const pokemonImage = getPokemonImage(id);
  
  function getPokemonImage(id) {
    let url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/`;
    if (id < 10) return url + "00" + id + ".png";
    else if (10 <= id && id < 100) return url + "0" + id + ".png";
    else return url + id + ".png";
  };

  const navigateToPokemon = () => {
    navigate(`/pokedex/${id}`, {
      state: { pokemonId: id, page: page},
    });
  };

  return (
    <a href={`/pokedex/${id}`}>
    <button className="cards" onClick={navigateToPokemon}>
        <div className="cards-title">{name}</div>
      <img className="cards-image" src={pokemonImage} alt={name}/>
      <div className="cards-type">
      {types.map((type, index) => (
        <Types key={index} type={type} />
      ))}
      </div>
    </button>
    </a>
  );
}
