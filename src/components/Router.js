import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import PokemonDetails from "./CardDetails";
import NotFound from "./NotFound";
import MainPage from "./MainPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/pokedex`} replace />} />
        <Route path="/pokedex" element={<MainPage />} />
        <Route path="/pokedex/:pokemonId" element={<PokemonDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
