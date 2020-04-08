import React from "react";

const SearchFilter = ({ filter, setFilter }) => {
  return (
    <>
      Filter:{" "}
      <input
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      ></input>
    </>
  );
};

export default SearchFilter;
