import React from 'react'
import "../styles/NotFound.css"
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="container">
      <h1>Page Not Found</h1>
      <a href="/pokedex">
      <button className="home-button" onClick={navigate('/pokedex')}>&#8592; Go To Pokedex</button>
      </a>
    </div>
  )
}