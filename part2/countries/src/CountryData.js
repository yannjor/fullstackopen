import React from 'react';

const CountryData = ({ country }) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population
                .toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</p>
            <h3>Languages</h3>
            <ul>
                {country.languages.map(language =>
                    <li key={language.name}>{language.name}</li>)}
            </ul>
            <div>
                <img alt="" border="1" width="10%" src={country.flag}></img>
            </div>
        </div>
    );
};

export default CountryData;

