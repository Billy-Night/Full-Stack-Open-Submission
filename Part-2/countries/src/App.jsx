import axios from "axios";
import { useState, useEffect } from "react";

const allCountries = `https://studies.cs.helsinki.fi/restcountries/api/all`;

// API key used from openweathermap.org
const api = import.meta.env.VITE_WEATHER_KEY;

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

const Country = ({ country, countryWeather }) => {
  let weatherIcon;
  if (countryWeather) {
    weatherIcon = `https://openweathermap.org/payload/api/media/file/${countryWeather.weather[0].icon}.png`;
  }
  const languages = Object.values(country.languages);

  return (
    <>
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
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      </div>
      <div>
        {countryWeather ? (
          <>
            <h2>Weather in {country.name.common}</h2>
            <p>Temperature: {countryWeather.temp} Celsius</p>
            <img src={weatherIcon} alt="weather icon" />
            <p>Wind {countryWeather.wind_speed} m/s</p>
          </>
        ) : (
          <p>Weather Loading...</p>
        )}
      </div>
    </>
  );
};

const App = () => {
  const [countries, setAllCountries] = useState([]);
  const [countrySearch, setCountrySearch] = useState("");
  const [countryWeather, setCountryWeather] = useState(null);

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

  const selectedCountry = foundCountry.length === 1 ? foundCountry[0] : null;

  useEffect(() => {
    if (!selectedCountry) {
      setCountryWeather(null);
      return;
    }

    setCountryWeather(null);

    const [lat, lon] = foundCountry[0].latlng;

    const weatherApi = `https://api.openweathermap.org/data/4.0/onecall/current?lat=${lat}&lon=${lon}&appid=${api}`;

    axios
      .get(weatherApi)
      .then((response) => {
        setCountryWeather(response.data.data[0]);
      })
      .catch((err) => {
        console.error(`Problem fetching weather for: ${foundCountry}`, err);
      });
  }, [selectedCountry?.name.common]);

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
        <Country country={foundCountry[0]} countryWeather={countryWeather} />
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
