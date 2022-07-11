import React, { useEffect, useState } from "react";
import "../styles/CardDetails.css";

export default function ProfileRow({ name, value }) {
  const [profileValue, setProfileValue] = useState([]);

  useEffect(() => {
    if (name === "Height:") {
      return setProfileValue(value + " m");
    } else if (name === "Weight:") {
      return setProfileValue(value + " kg");
      // As Braden mentioned on the meeting today, this is an example
      // of state variables that don't need to be state variables
    } else {
      let arrayOfValues = [];
      (value || []).map((element) => {
        return arrayOfValues.push(element.charAt(0).toUpperCase() + element.substring(1).toLowerCase()
        );
      });
      return setProfileValue(arrayOfValues.join(", "));

      // This can be cleaned up into essentially a single line. Array map actually
      // is used to make a new array, in this code you are treating it as a [].forEach
      // Something like this example below should work, using functional programming and a single line
      // of code
      //
      // const values = value.map(val => 
      //     val.charAt(0).toUpperCase() + val.substring(1)).join(", ");
    }
  }, []);

  return (
    <div className="profile-row">
      <div className="profile-name">{name}</div>
      <div className="profile-value">{profileValue}</div>
    </div>
  );
}
