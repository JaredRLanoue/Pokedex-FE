import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Search from "./Search";
import "../styles/MainPage.css";
import "../styles/Search.css";
import "../styles/Card.css";
import Card from "./Card";
import { Helmet } from "react-helmet";
import Loading from "./Loading"

export default function MainPage() {
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const urlParams = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    fetch(
      `https://intern-pokedex.myriadapps.com/api/v1/pokemon?` +
        new URLSearchParams({ page })
    )
      .then((resp) => resp.json())
      .then(({ data, meta }) => {
        setPageData(data);
        setSearchParams({ page: page });
        setMeta(meta);
        setIsLoading(false);
      });
  }, [page]);

  return (
    <div className="page-container">
      <Helmet>
        <title>{`Pokédex`}</title>
      </Helmet>
      <Search
        setPageData={setPageData}
        setPage={setPage}
        meta={meta}
        page={page}
      />
      {isLoading ? (<Loading/>) : (
      <div className="bottom-container">
        {pageData.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} page={page} />
        ))}
      </div>
      )}
    </div>
  );
}
