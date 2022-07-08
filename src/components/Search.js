import React, { useCallback } from "react";
import "../styles/NotFound.css";
import "./MainPage";
import searchIcon from "../assets/search.svg";
import debounce from "lodash.debounce";

const Search = ({
  setPageData,
  setSearchParams,
  meta,
  page
}) => {

  const handleSearch = (searchInput) => {
    fetch(
      `https://intern-pokedex.myriadapps.com/api/v1/pokemon?name=${searchInput.target.value}`
    )
      .then((resp) => resp.json())
      .then(({ data }) => {
        setPageData(data);
        if (searchInput.target.value === "") setSearchParams({ page: page });
        else setSearchParams({ page: page, name: searchInput.target.value });
      });
  };

  const navigateNextPage = () => {
    if (page >= meta.last_page) return null;
    else setSearchParams({ page: page + 1 });
  };

  const navigatePreviousPage = () => {
    if (page <= 1) return null;
    else setSearchParams({ page: page - 1 });
  };

  return (
    <div className="header-container">
      <button className="nav-back" onClick={navigatePreviousPage} />
      <h1 className="title">Pokédex</h1>
      <div className="search-box">
        <img draggable="false" src={searchIcon} alt="" />
        <input
          type="text"
          placeholder="Search"
          onChange={useCallback(debounce(handleSearch, 300))}
        />
      </div>
      <button className="nav-next" onClick={navigateNextPage} />
    </div>
  );
};

export default Search;
