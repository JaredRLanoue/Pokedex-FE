import React from "react";
import "../styles/PokemonDetails.css";

export default function ProfileRow({ name, value }) {
  const profileValue = setUpProfileValue();

  function setUpProfileValue() {
    if (name === "Height:") {
      return value + " m";
    } else if (name === "Weight:") {
      return value + " kg";
    } else {
      return value
        .map(
          (val) => val.charAt(0).toUpperCase() + val.substring(1).toLowerCase()
        )
        .join(", ");
    }
  }

  return (
    <div className="profile-row">
      <div className="profile-name">{name}</div>
      <div className="profile-value">{profileValue}</div>
    </div>
  );
}
