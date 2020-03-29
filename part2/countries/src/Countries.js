import React from 'react';
import CountryData from './CountryData';
import CountryList from './CountryList';

const Countries = ({ countries, filter, handleShowCountry }) => {
    const newCountries = countries.filter(country =>
        country.name.toLowerCase().includes(filter.toLowerCase())
    );
    if (filter === '' || newCountries.length === 0) {
        return <></>;
    }
    else {
        if (newCountries.length > 10) {
            return <p>Too many matches, please specify query</p>;
        } else if (newCountries.length > 1) {
            return <CountryList
                countryList={newCountries}
                handleShowCountry={handleShowCountry} />;
        } else {
            return <CountryData country={newCountries[0]} />;
        }
    }
};

export default Countries;
