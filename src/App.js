import React, { useState, useEffect } from "react";
import CountryCard from "./countryCard/countryCard";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]); // Correct naming convention for state
  const [searchTerm, setSearchTerm] = useState(""); // For search input

  // Update the search term state
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter countries based on the search term
  const filteredCountries = data.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const apiData = await fetch("https://restcountries.com/v3.1/all");
        const actualData = await apiData.json();
        setData(actualData); // Set the data state with fetched data
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
