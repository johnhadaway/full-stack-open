import { useEffect, useState } from 'react';
import Country from './components/Country.js';
import countriesService from './services/countries.js';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesService.getAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const handleSearch = (event) => {
    setSelectedCountry(null);
    setSearch(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const showCountry = () => {
    if (selectedCountry) {
      return <Country country={selectedCountry} />;
    }

    if (filteredCountries.length >= 10) {
      return <p>Too many matches!</p>;
    } else if (filteredCountries.length > 1 && filteredCountries.length < 10) {
      return filteredCountries.map((country) => (
        <p key={country.cca3}>
          {country.name.common}&nbsp;
          <button onClick={() => {
            setSearch(country.name.common);
            setSelectedCountry(country);
          }}>Show</button>
        </p>
      ));
    } else if (filteredCountries.length === 1) {
      return <Country country={filteredCountries[0]} />;
    }
  };

  return (
    <>
      <div>
        <label htmlFor="search">Search: </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div>{showCountry()}</div>
    </>
  );
};

export default App;