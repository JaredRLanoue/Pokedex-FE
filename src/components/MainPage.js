import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Search from "./Search";
import "../styles/MainPage.css";
import "../styles/Search.css";
import "../styles/Card.css";
import Card from "./Card";
import Loading from "./Loading";

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams({page: 1});
  const [pageData, setPageData] = useState([]);
  const [meta, setMeta] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let page = parseInt(searchParams.get("page"));

  useEffect(() => {
    setSearchParams({page: page})
    fetch(
      `https://intern-pokedex.myriadapps.com/api/v1/pokemon?` +
        new URLSearchParams({ page })
    )
      .then((resp) => resp.json())
      .then(({ data, meta }) => {
        document.title = "Pokédex";
        setPageData(data);
        setMeta({ meta });
        setIsLoading(false);
      });
  }, [searchParams.get("page")]);

  
  if (isLoading) return <Loading />;
  else return (
      <div className="page-container">
        <Search
          setPageData={setPageData}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
          meta={meta}
          page={page}
        />
          <div className="bottom-container">
            {pageData.map((pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} page={page} />
            ))}
          </div>
      </div>
    );
  }
