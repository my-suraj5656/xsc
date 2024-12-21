import React, { useState, useEffect } from "react";
import CountryCard from "./countryCard/countryCard";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]); // State to store all countries
  const [filteredData, setFilteredData] = useState([]); // State to store filtered countries
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  // Update the search term state and filter data
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Filter the data based on the search term
    const filtered = data.filter((country) =>
      country.name.common.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const apiData = await fetch("https://restcountries.com/v3.1/all");
        const actualData = await apiData.json();
        setData(actualData); // Set original data
        setFilteredData(actualData); // Initialize filteredData with all countries
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
        {filteredData.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};

export default App;
