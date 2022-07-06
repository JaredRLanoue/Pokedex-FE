import React from 'react'
import "../styles/NotFound.css"
import { useNavigate } from 'react-router-dom';

export default function NotFound() {

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    
    <div className="container">
      <h1>Error - 404</h1>
      <button className="home-button" onClick={navigateToHome}>&#8592; Go Back Home</button>
    </div>
  )
}