import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Search from "./Search";
import "../styles/MainPage.css";
import "../styles/Search.css";
import "../styles/Pokemon.css";
import Pokemon from "./Pokemon";
import Loading from "./Loading";

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const [pageData, setPageData] = useState([]);
  const [meta, setMeta] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let page = parseInt(searchParams.get("page"));
  let name = searchParams.get("name");

  useEffect(() => {
    if (!name) name = "";
    else page = 1;
    fetch(
      `https://intern-pokedex.myriadapps.com/api/v1/pokemon?` +
        new URLSearchParams({ page, name })
    )
      .then((resp) => resp.json())
      .then(({ data, meta }) => {
        document.title = "Pokédex";
        setPageData(data);
        setMeta(meta);
        setIsLoading(false);
      });
  }, [page, name]);

  if (isLoading) return <Loading />;
  else
    return (
      <div className="page-container">
        <Search
          setSearchParams={setSearchParams}
          searchParams={searchParams}
          meta={meta}
          page={page}
        />
        <div className="bottom-container">
          {pageData.map((pokemon) => (
            <Pokemon key={pokemon.id} pokemon={pokemon} page={page} />
          ))}
        </div>
      </div>
    );
}
