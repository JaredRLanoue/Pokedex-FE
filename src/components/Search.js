import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.css";
import "./MainPage";
import searchIcon from "../assets/search.svg";
import debounce from "lodash.debounce";

const Search = ({ setSearchParams, meta, page }) => {
  const nextPage = navigateNextPage();
  const previousPage = navigatePreviousPage();

  const handleSearch = (event) => {
    if (event.target.value === "") setSearchParams({ page: page });
    else setSearchParams({ page: page, name: event.target.value });
  };

  function navigateNextPage() {
    if (page >= meta.last_page) return meta.last_page;
    else {
      if (page < 1) return 1;
      else return page + 1;
    }
  }

  function navigatePreviousPage() {
    if (page <= 1) return 1;
    else {
      if (page > meta.last_page) return 1;
      else return page - 1;
    }
  }

  return (
    <div className="header-container">
      <Link to={`/pokedex?page=${previousPage}`} className="nav-back" />
      <Link to={`/pokedex?page=1`} className="title">
        Pokédex
      </Link>
      <div className="search-box">
        <img draggable="false" src={searchIcon} alt="Search Icon" />
        <input
          type="text"
          placeholder="Search"
          onChange={useCallback(debounce(handleSearch, 300))}
        />
      </div>
      <Link to={`/pokedex?page=${nextPage}`} className="nav-next" />
    </div>
  );
};

export default Search;
