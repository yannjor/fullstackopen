import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './Countries';

const CountriesSearch = ({ setFilter }) => {
  return (
    <>
      Find countries: <input type="text"
        onChange={(event) => setFilter(event.target.value)}></input>
    </>
  );
};


const App = () => {

  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(res => {
      console.log(res.data);
      setCountries(res.data);
    });
  }, []);


  const handleShowCountry = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };


  return (
    <>
      <CountriesSearch setFilter={setFilter} />
      <Countries
        countries={countries}
        filter={filter}
        handleShowCountry={handleShowCountry}
      />
    </>
  );
};

export default App;
