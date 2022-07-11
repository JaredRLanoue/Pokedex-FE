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
  // I think that the name of the file and the component could be improved here
  // The name of the file implies that it is a card, but it is actual a page.
  // PokemonDetails I think would be the more concise name here
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
  // I don't think this is the right parameter to pass through to the useEffect dependancy
  // array. As it is set from within the useEffect with setPokemon. I woiuld have expected
  // this to cause an infinite loop
  // 
  // I think that the variable you actually want to watch for changes is pokemonId
  // which should only be set from a single source, rather than conditionally from either
  // way like its doing on line 24 above.

  const getPokemonImage = (id) => {
    let url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/`;
    if (id < 10) return url + "00" + id + ".png";
    else if (10 <= id && id < 100) return url + "0" + id + ".png";
    else return url + id + ".png";
  };
  //I mentioned this in one of the previous reviews, but in javascript there is a function
  //called padStart that does exactly what you are looking for here and should clean things
  //up dramatically

  if (isLoading) return <Loading />;
  else return (
    <div className={"details-page"}>
      {/*
        This className can be used without the brackets and just "details-page"
        Speaking of, "Details Page" could also be a good name for this component. 
        When there is a parent level wrapper class like this, it is a good idea to keep 
        it as the same name as the name of the parent component
      */}
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
        {/*
         I've noticed this in a couple different places now where there is both an href and 
         a click handler. I'm not exactly sure why both of these were needed, but I suspect it
         was to keep the URL state in sync with the page state?

         Ideally everything would go through react router and you would never need these 
         hrefs 
        */}
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
              {/*
                I haven't mentioned this yet in other reviews, but if every single
                instance of types is mapped over, the map could be included in the 
                component. 

                <Types types={types} />

                This is also a good example of a name that could be improved upon as well. 
                Here you are mapping over types and displaying a single type. So the name
                Types doesn't match the data type that is being displayed. Like I said 
                above though, the map could be included and you could keep the name the same

              */}
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
