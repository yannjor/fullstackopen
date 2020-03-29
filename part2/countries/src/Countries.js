import React from 'react';
import CountryData from './CountryData';

const Countries = ({ countries, filter }) => {
    console.log(filter);
    const newCountries = countries.filter(country =>
        country.name.toLowerCase().includes(filter.toLowerCase())
    );
    if (filter === '' || newCountries.length === 0) {
        return <></>;
    }
    else {
        console.log(newCountries);
        if (newCountries.length > 10) {
            return <p>Too many matches, please specify query</p>;
        } else if (newCountries.length > 1) {
            return (
                <>
                    {newCountries.map(country => <p key={country.name}>{country.name}</p>)}
                </>
            );
        } else {
            return <CountryData country={newCountries[0]} />;
        }
    }
};

export default Countries;
