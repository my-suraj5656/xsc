import React from "react";
import "./countryCard.css";

const countryCard = ({ name, flag }) => {
  return (
    <div className="countryCard">
      <img src={flag} alt={`Flag of ${name}`} className="countryCard-flag" />
      <p>{name}</p>
    </div>
  );
};

export default countryCard;
