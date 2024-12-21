import React, { useState, useEffect } from "react";
import CountryCard from "./countryCard";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = data.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const apiData = await fetch("https://restcountries.com/v3.1/all");
        if (!apiData.ok) {
          throw new Error("Network response was not ok");
        }
        const actualData = await apiData.json();

        setData(actualData);
      } catch (err) {
        console.error("Failed to fetch the data:", err);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search for countries..."
        className="search-bar"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="countries-container">
        {filteredCountries.map((country) => (
          <CountryCard
            key={country.cca3 || country.name.common}
            country={country}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
