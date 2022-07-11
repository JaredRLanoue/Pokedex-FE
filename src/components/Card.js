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
  //  I've seen this function used in a couple different places, this could be
  //  consolidated to a single utility function that we could use in both places.
  //  Additionally, javascript has a padLeft function that will do exactly what
  //  you need here in adding zeros to the left side.


  const navigateToPokemon = () => {
    navigate(`/pokedex/${id}`, {
      state: { pokemonId: id, page: page},
    });

    //  You should be able to navigate to pokemon just using the route. 
    //  If you navigate to an individual Pokemon the page should no longer matter. 
    //  you could always use the browser back button to go to the previous page if needed

  };

  return (
    <a href={`/pokedex/${id}`}>
    <button className="cards" onClick={navigateToPokemon}>
      {/* You shouldn't need to use both an anchor tag and the button here */}
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
