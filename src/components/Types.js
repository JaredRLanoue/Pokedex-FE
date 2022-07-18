import React from "react";
import "../styles/Types.css";

export default function Types({ types }) {
  return (
    <div className="pokemon-type">
      {types.map((type, index) => (
        <div className={`${type} type-box`} key={index}>{type}</div>
      ))}
    </div>
  );
}
