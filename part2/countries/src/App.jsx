import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./Filter";
import Countries from "./Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleFilterChange = ({ target }) => {
    setFilter(target.value);
  };
  const handleShowCountry = ({ target }) => {
    setFilter(target.value);
  };

  const countriesFiltered = countries.filter((c) =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} />
      <Countries
        countries={countriesFiltered}
        handleShowCountry={handleShowCountry}
      />
    </div>
  );
};

export default App;
