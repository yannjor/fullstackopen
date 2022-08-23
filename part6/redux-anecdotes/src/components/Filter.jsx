import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter
      <input
        name="filter"
        onChange={(event) => props.setFilter(event.target.value)}
      />
    </div>
  );
};


export default connect(null, { setFilter })(Filter);
