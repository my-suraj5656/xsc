import React from "react";
import "./countryCard.css";

const CountryCard = ({ country }) => {
  const flag = country.flags?.png || "https://via.placeholder.com/150";
  const name = country.name?.common || "Unknown Country";

  return (
    <div className="countryCard">
      <img src={flag} alt={`Flag of ${name}`} className="countryCard-flag" />
      <h3 className="countryCard-name">{name}</h3>
    </div>
  );
};

export default CountryCard;
