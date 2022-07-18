import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";
import Types from "./Types";
import "../styles/Types.css";
import "../styles/PokemonDetails.css";
import ProfileRow from "./ProfileRow";
import StatsRow from "./StatsRow";
import Helmet from "react-helmet";

const PokemonDetails = () => {
  const [pokemonImage, setPokemonImage] = useState();
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    stats,
    types,
    name,
    id,
    genus,
    description,
    egg_groups,
    abilities,
    weight,
    height,
  } = pokemon;
  const UrlParams = useParams();
  let pokemonId = UrlParams.pokemonId;
  const pokemonPerPage = 15;

  useEffect(() => {
    fetch(`https://intern-pokedex.myriadapps.com/api/v1/pokemon/${pokemonId}`)
      .then((resp) => resp.json())
      .then(({ data }) => {
        document.title = `${data.name} | Pokédex`;
        setPokemon(data);
        setPokemonImage(getPokemonImage(data.id));
        setIsLoading(false);
      });
  }, [pokemonId]);

  const getPokemonImage = (id) => {
    return (
      `https://assets.pokemon.com/assets/cms2/img/pokedex/full/` +
      id.toString().padStart(3, "0") +
      ".png"
    );
  };

  if (isLoading) return <Loading />;
  else
    return (
      <div className="pokemon-details-page">
        <Helmet>
          <body className={`${types[1] || types[0]}`} />
        </Helmet>
        <div className="pokemon-details-header">
          <Link to={`/pokedex?page=${Math.ceil(pokemon.id / pokemonPerPage)}`} className="nav-back"/>
          <h3>{name}</h3>
        </div>
        <div className="pokemon-details-card">
          <div className="card-top">
            <div className="card-title">{name}</div>
            <div className="card-number">#{id}</div>
            <Types types={types} />
          </div>
          <div className="border" />
          <div className="card-middle">
            <img className="card-image" src={pokemonImage} alt={name} />
            <div className="card-stats">
              {Object.entries(stats).map((stat) => (
                <StatsRow key={stat} name={stat[0]} value={stat[1]} />
              ))}
            </div>
          </div>
          <div className="card-bottom">
            <div className="card-bottom-top">
              <div className="genus">{genus}</div>
              <div className="description">{description}</div>
              <div className="profile-title"> Profile </div>
            </div>
            <div className="profile-container">
              <div className="profile-section">
                <ProfileRow name="Egg Groups:" value={egg_groups} />
                <ProfileRow name="Abilities:" value={abilities} />
              </div>
              <div className="profile-section">
                <ProfileRow name="Weight:" value={weight} />
                <ProfileRow name="Height:" value={height} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default PokemonDetails;
