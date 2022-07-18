import React from "react";
import "../styles/NotFound.css";
import { Link } from "react-router-dom";

export default function NotFound() {

  return (
    <div className="container">
      <h1>Page Not Found</h1>
      <Link to="/pokedex" className="home-button">
        &#8592; Go To Pokedex
      </Link>
    </div>
  );
}
