const Filter = ({ handleFilterChange }) => {
  return (
    <div>
      Find countries: <input onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
