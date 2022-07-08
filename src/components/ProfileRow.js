import React, { useEffect, useState } from "react";
import "../styles/CardDetails.css";

export default function ProfileRow({ name, value }) {
  const [profileValue, setProfileValue] = useState([]);

  useEffect(() => {
    if (name === "Height:") {
      return setProfileValue(value + " m");
    } else if (name === "Weight:") {
      return setProfileValue(value + " kg");
    } else {
      let arrayOfValues = [];
      (value || []).map((element) => {
        return arrayOfValues.push(element.charAt(0).toUpperCase() + element.substring(1).toLowerCase()
        );
      });
      return setProfileValue(arrayOfValues.join(", "));
    }
  }, []);

  return (
    <div className="profile-row">
      <div className="profile-name">{name}</div>
      <div className="profile-value">{profileValue}</div>
    </div>
  );
}
