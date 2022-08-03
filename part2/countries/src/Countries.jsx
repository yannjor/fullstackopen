import Country from "./Country";

const Countries = ({ countries, handleShowCountry }) => {
  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else if (countries.length <= 10) {
    return (
      <div>
        {countries.map((c) => (
          <p key={c.name.common}>
            {c.name.common}
            <button onClick={handleShowCountry} value={c.name.common}>
              Show
            </button>
          </p>
        ))}
      </div>
    );
  } else {
    return <p>Too many matches, specify filter</p>;
  }
};

export default Countries;
