import React from 'react';

const CountryList = ({ countryList, handleShowCountry }) => {
    return (
        <>
            {countryList.map(country =>
                <p key={country.name}>{country.name} <button
                    onClick={(handleShowCountry)} value={country.name}>Show</button></p>
            )}
        </>
    );
};

export default CountryList;
