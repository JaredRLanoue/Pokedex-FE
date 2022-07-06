import React, { useEffect, useState } from "react";
import {
  useLocation,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import Loading from "./Loading";
import Types from "./Types";
import "../styles/Types.css";
import "../styles/CardDetails.css";
import ProfileRow from "./ProfileRow";
import StatsRow from "./StatsRow";

const Details = () => {
  const [pokemonImage, setPokemonImage] = useState();
  const { state } = useLocation();
  const [pokemon, setPokemon] = useState([]);
  const UrlParams = useParams();
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [types, setTypes] = useState([]);

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

  useEffect(() => {
    setIsLoading(true);
    let pokemonValue = UrlParams.pokemonId || state.id;
    fetch(
      `https://intern-pokedex.myriadapps.com/api/v1/pokemon/${pokemonValue}`
    )
      .then((resp) => resp.json())
      .then(({ data }) => {
        setPokemon(data);
        setIsLoading(false);
        setTypes(data.types)
      });
  }, []);

  useEffect(() => {
    if (state === null) {
      setPokemonImage(getPokemonImage(pokemon.id));
    } else {
      setPokemonImage(state.image);
    }
  }, [pokemon]);

  const navigatePreviousPage = () => {
    if (state === null) {
      navigate(`/pokedex`);
    } else {
      navigate(`/pokedex?page=${state.page}`);
    }
  };

  if(pokemon !== undefined){
    console.log(pokemon.stats)
    console.log(types[0])
  }

  return (
    <div className={`details-page, ${types[0]}`}>
      <Helmet>
        <title>{`${pokemon.name} | Pokédex`}</title>
      </Helmet>

      <div className="details-header">
        <button
          className="details-back-button"
          onClick={navigatePreviousPage}
        />
        <h3>{pokemon.name}</h3>
      </div>
    
      {isLoading ? (
        <Loading />
      ) : (
        <div className="details-card">
          <div className="card-top">
            <div className="card-title">{pokemon.name}</div>
            <div className="card-number">#{pokemon.id}</div>
            <div className="cards-type">
              {(pokemon.types || []).map((type, index) => (
                <Types key={index} type={type} />
              ))}
            </div>
          </div>
          <div className="border" />
          <div className="card-middle">
            <img className="card-image" src={pokemonImage} alt={pokemon.name} />
            <div className="card-stats">
              {/* {Object.entries(stats).map ( stat => (
                <StatsRow name={stat[0]} value={stat[1]}/>
              ))} */}
            </div>
          </div>
          <div className="card-bottom">
            <div className="card-bottom-top">
              <div className="genus">{pokemon.genus}</div>
              <div className="description">{pokemon.description}</div>
              <div className="profile-title"> Profile </div>
            </div>
            <div className="profile-container">
              <div className="profile-section"> 
                <ProfileRow name="Egg Groups:" value={pokemon.egg_groups}/>
                <ProfileRow name="Abilities:" value={pokemon.abilities}/>
              </div>

              <div className="profile-section" >
                <ProfileRow name="Weight:" value={pokemon.weight}/>
                <ProfileRow name="Height:" value={pokemon.height}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;


// {Object.entries(pokemon.stats || []).map(([key,value])=>
//   <StatsRow key={key} value={value} name={key}/>)}