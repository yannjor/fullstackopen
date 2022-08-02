const PersonForm = ({ addPerson, handleNameChange, handleNumberChange }) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          Name: <input onChange={handleNameChange} />
        </div>
        <div>
          Number: <input onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
