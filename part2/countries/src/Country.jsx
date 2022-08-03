import Weather from "./Weather";

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img
        alt={`Flag of ${country.name.common}`}
        src={country.flags.png}
        border="1"
      />
      <Weather capital={country.capital} />
    </div>
  );
};

export default Country;
