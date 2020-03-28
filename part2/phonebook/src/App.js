import React, { useState } from 'react';


const SearchFilter = ({ filterPhonebook }) => {
  return (
    <>
      Filter: <input type="text" onChange={filterPhonebook}></input>
    </>
  );
};


const AddPersonForm = ({ addPerson, newName, newNumber, setNewName, setNewNumber }) => {
  return (
    <>
      <h2>Add new</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input type="text" value={newName}
            onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          Number: <input type="tel" value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}></input>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
};


const Persons = ({ persons }) => {
  return (
    <>
      {persons.map(person => <Person key={person.name} name={person.name}
        number={person.number} />)}
    </>
  );

};


const Person = ({ name, number }) => {
  return <p>{name} {number}</p>;
};


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);


  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      if (newName.toLowerCase().includes(filter.toLowerCase()))
        setFilteredPersons(filteredPersons.concat({ name: newName, number: newNumber }));
    }

    setNewName('');
    setNewNumber('');
  };


  const filterPhonebook = (event) => {
    setFilter(event.target.value);
    const newPersons = persons.filter(person =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setFilteredPersons(newPersons);
  };


  return (
    <>
      <h1>Phonebook</h1>
      <SearchFilter filterPhonebook={filterPhonebook} />
      <AddPersonForm addPerson={addPerson} newName={newName} newNumber={newNumber}
        setNewName={setNewName} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </>
  );
};

export default App;