import React, { useState, useEffect } from "react";
import "../styles/CardDetails.css";

export default function StatsRow({ name, value }) {
  const [statsData, setStatData] = useState();
  const maxValues = { hp: 255, speed: 160, attack: 165, defense: 230, spatk: 154, spdef: 230 };

  useEffect(() => {
    if (name === "hp") {
      setStatData({ name: "HP", width: (value / maxValues.hp) * 100 });
    } else if (name === "speed") {
      setStatData({ name: "Speed", width: (value / maxValues.speed) * 100 });
    } else if (name === "attack") {
      setStatData({ name: "Attack", width: (value / maxValues.attack) * 100 });
    } else if (name === "defense") {
      setStatData({ name: "Defense", width: (value / maxValues.defense) * 100 });
    } else if (name === "special-attack") {
      setStatData({ name: "Sp Atk", width: (value / maxValues.spatk) * 100 });
    } else if (name === "special-defense") {
      setStatData({ name: "Sp Def", width: (value / maxValues.spdef) * 100 });
    }
  }, []);

  //  I think you could refactor away this useEffect. You could define an object w
  //  with a shape like this:
  //
  //  const statValues = {
  //   hp: {
  //     name: 'HP',
  //     value: 255
  //   }
  //   ...
  //  }
  // 
  //  Then below in your code you could do statValues[slug].name and statValues[slug].value
  //  to get the values you need inline. Eliminating the need to keep these state variables

  if (statsData !== undefined) {
    //  You could just check if (statsData) { ... }
    return (
      <div className="stats-row">
        <div className="stats-name">{statsData.name}</div>
        <div className="stats-value-background">
          <div className="stats-value" style={{ width: `${statsData.width}%` }}>
            {value}
          </div>
        </div>
      </div>
    );
  }
}
