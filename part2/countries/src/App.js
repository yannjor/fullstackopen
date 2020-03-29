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

  return (
    <>
      <CountriesSearch setFilter={setFilter} />
      <Countries
        countries={countries}
        filter={filter}
      />
    </>
  );
};

export default App;
