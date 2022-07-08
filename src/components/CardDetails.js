import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Types from "./Types";
import "../styles/Types.css";
import "../styles/CardDetails.css";
import ProfileRow from "./ProfileRow";
import StatsRow from "./StatsRow";
import Helmet from "react-helmet";

const Details = () => {
  const [pokemonImage, setPokemonImage] = useState();
  const {state} = useLocation();
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { stats, types, name, id, genus, description, egg_groups, abilities, weight, height } = pokemon;
  const UrlParams = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    let pokemonId = UrlParams.pokemonId || state.pokemonId;
    fetch(`https://intern-pokedex.myriadapps.com/api/v1/pokemon/${pokemonId}`)
      .then((resp) => resp.json())
      .then(({ data }) => {
        document.title = `${data.name} | Pokédex`;
        setPokemon(data);
        setPokemonImage(getPokemonImage(data.id));
        setIsLoading(false);
      });
  }, [pokemon]);

  const getPokemonImage = (id) => {
    let url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/`;
    if (id < 10) return url + "00" + id + ".png";
    else if (10 <= id && id < 100) return url + "0" + id + ".png";
    else return url + id + ".png";
  };

  if (isLoading) return <Loading />;
  else return (
    <div className={"details-page"}>
      <Helmet>
        <body className={`${types[1] || types[0]}`} />
      </Helmet>
      <div className="details-header">
        <a href="/pokedex">
          <button
            className="nav-back"
            onClick={() => navigate(`/pokedex?page=${state.page || 1}`)}
          />
        </a>
        <h3>{name}</h3>
      </div>
        <div className="details-card">
          <div className="card-top">
            <div className="card-title">{name}</div>
            <div className="card-number">#{id}</div>
            <div className="cards-type">
              {types.map((type, index) => (
                <Types key={index} type={type} />
              ))}
            </div>
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

export default Details;
