import React from "react";
import { useNavigate } from "react-router-dom";
import Types from "./Types";

export default function Card({ pokemon, page }) {
  const navigate = useNavigate();
  const image = getPokemonImage(pokemon.id);
  
  function getPokemonImage(id) {
    let url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/`;
    let newId = "";
    if (id < 10) {
      newId = "00" + id;
    } else if (10 <= id && id < 100) {
      newId = "0" + id;
    } else {
      newId = id;
    }
    return url + newId + ".png";
  }

  const navigateToPokemon = () => {
    navigate(`/pokedex/${pokemon.id}`, {
      state: { id: pokemon.id, page: page, image: image},
    });
  };

  return (
    <a href={`/pokedex/${pokemon.id}`}>
    <button className="cards" onClick={navigateToPokemon}>
        <div className="cards-title">{pokemon.name}</div>
      <img className="cards-image" src={image} alt={pokemon.name}/>
      <div className="cards-type">
      {pokemon.types.map((type, index) => (
        <Types key={index} type={type} />
      ))}
      </div>
    </button>
    </a>
  );
}
