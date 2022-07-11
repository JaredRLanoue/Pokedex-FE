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

  // Normally useEffect array parameters are supposed to be singular variables that useEffect
  // can watch for changes which trigger the content inside of them to run. In this case
  // I think we want to watch for changes to page as a whole. 
  //
  // Every time the page changes, we want to trigger this request to get the next page of
  // pokemon. 
  //
  // Gaven and Brian are implementing context to their application. 
  // I think this could be useful for you as well. There are a bunch of different ways that
  // requests to this endpoint are happening inside of the app. At the very least I 
  // think that have a single unified way that requests are made would save a lot of
  // headaches and resolve many of the problems and complexity caused by having this code
  // in both of these locations. 
  //
  // It is a bigger change, but I think that by making it it would resolve a lot of
  // the smaller issues you are having around page state and pagination through 
  // the pokedex. 
  // 
  // I'd be happy to help you refactor this stuff all too if you would like :)

  
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
