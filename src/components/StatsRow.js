import React from "react";
import "../styles/PokemonDetails.css";

export default function StatsRow({ name, value }) {
  const statValues = {
    hp: {
      name: "HP",
      value: 255,
    },
    speed: {
      name: "Speed",
      value: 160,
    },
    attack: {
      name: "Attack",
      value: 165,
    },
    defense: {
      name: "Defense",
      value: 230,
    },
    "special-attack": {
      name: "Sp Atk",
      value: 154,
    },
    "special-defense": {
      name: "Sp Def",
      value: 230,
    },
  };

  return (
    <div className="stats-row">
      <div className="stats-name">{statValues[name].name}</div>
      <div className="stats-value-background">
        <div
          className="stats-value"
          style={{ width: `${(value / statValues[name].value) * 100}%` }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}
