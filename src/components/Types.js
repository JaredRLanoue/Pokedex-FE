import React from "react"
import "../styles/Types.css"

export default function Types({type}) {

  return (
    <div className={`${type} type-box`}>
      {type}
    </div>
  )
}
