import axios from "axios";
import { useState, useEffect } from "react";

const countryName = "finland";
const baseUrl = `https://studies.cs.helsinki.fi/restcountries/`;
const allCountries = `https://studies.cs.helsinki.fi/restcountries/api/all`;
const coutryByName = `https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`;
// Make and application that allows you to view the countries from API
// Make the user interface simple, the country is found by searching the name
// If there are too many countries that match the query, then the user is prompted to make their query more specific
// Add a button next to each country
// When pressed show just that country
// Countries that have names that appear in other countries names can be ignored

const Countries = ({ foundCountry, handleCountrySelect }) => {
  return (
    <div>
      {foundCountry.length >= 10 ? (
        <p>Sorry the query is too large, be more specific</p>
      ) : (
        foundCountry.map((country) => (
          <div key={country.name.common}>
            <p>{country.name.common}</p>
            <button onClick={() => handleCountrySelect(country.name.common)}>
              Show
            </button>
          </div>
        ))
      )}
    </div>
  );
};

const Country = ({ country }) => {
  const languages = Object.values(country.languages);

  return (
    <div>
      <h1>Country Name: {country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
    </div>
  );
};

const App = () => {
  const [countries, setAllCountries] = useState([]);
  const [countrySearch, setCountrySearch] = useState("");

  useEffect(() => {
    axios
      .get(allCountries)
      .then((response) => {
        setAllCountries(response.data);
      })
      .catch((err) => {
        console.error("There was an issue getting the countries", err);
      });
  }, []);

  const foundCountry = countries.filter((country) =>
    country.name.common.toLowerCase().includes(countrySearch.toLowerCase()),
  );

  const handleCountrySearch = (event) => {
    setCountrySearch(event.target.value);
  };

  const handleCountrySelect = (selectedCountry) => {
    setCountrySearch(selectedCountry);
  };

  return (
    <>
      <h1>Country Search</h1>
      <p>Find countries:</p>
      <input value={countrySearch} onChange={handleCountrySearch} />
      {foundCountry.length === 1 ? (
        <Country country={foundCountry[0]} />
      ) : (
        <Countries
          foundCountry={foundCountry}
          handleCountrySelect={handleCountrySelect}
        />
      )}
    </>
  );
};

export default App;
