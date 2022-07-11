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
    // The name of this parameter is a little confusing. Down below where you check for
    // the contents of it, the actual search input is the searchInput.target.value
    // typically I see this parameter being called "event" as that is what is
    // actually being returned while the user types an even with their input

    fetch(
      `https://intern-pokedex.myriadapps.com/api/v1/pokemon?name=${searchInput.target.value}`
    )
      .then((resp) => resp.json())
      .then(({ data }) => {
        setPageData(data);
        if (searchInput.target.value === "") setSearchParams({ page: page });
        else setSearchParams({ page: page, name: searchInput.target.value });
        // I would expect handle search to set the search term on state, 
        // then everything around requesting the data could live
        // inside of a useEffect that watches for changes on
        // the changing search term. 
        //
        // This brings up the idea of how data should flow through the application
        // rather than state being set from within the request, everything should happen
        // in a linear fashion. 
        //
        // user types -> causes state to update -> triggers request -> get data -> set data
        // 
        // This idea is central to functional programming that I've described during these
        // reviews a couple times, which is a fundamental idea in React. Each of these
        // things should have no other side effects and data should flow in a singular
        // stream through this process not creating any mutations or outside side effects

      });
  };
  //

  const navigateNextPage = () => {
    if (page >= meta.last_page) return null;
    else setSearchParams({ page: page + 1 });
  };

  const navigatePreviousPage = () => {
    if (page <= 1) return null;
    else setSearchParams({ page: page - 1 });
  };
  // In both of these instances we shouldn't need to do a conditional. Rather 
  // then silently failing if the user clicks on one of these buttons, instead the buttons
  // should be disabled if the respective conditional is met


  return (
    <div className="header-container">
      <button className="nav-back" onClick={navigatePreviousPage} />
      <h1 className="title">Pokédex</h1>
      <div className="search-box">
        <img draggable="false" src={searchIcon} alt="" />
        {/* Missing alt tag here */}
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
