import React, { useEffect } from 'react';
import weatherServices from '../services/weather.js';

const Country = ({ country }) => {
  const [weather, setWeather] = React.useState(null);

  useEffect(() => {
    weatherServices.getWeather(country.capital).then((weather) => {
      setWeather(weather);
    });
  }, []);

  return (
    <>
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population.toLocaleString()}</p>
        <img src={country.flags.svg} alt={`${country.name.common} flag`} width="100" />
      </div>
      <div>
        <h3>Weather in {country.capital}</h3>
        {weather && (
          <>
            <p>
              <strong>Temperature: </strong>
              {weather.main.temp} Celsius
            </p>
            <img
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
            />
            <p>
              <strong>Wind: </strong>
              {weather.wind.speed} m/s
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Country;