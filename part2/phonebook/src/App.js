import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPersonForm from './AddPersonForm';
import Persons from './Persons';
import SearchFilter from './SearchFilter';



const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');


  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(res => {
      setPersons(res.data);
    });
  }, []);



  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
    }
    setNewName('');
    setNewNumber('');
  };


  return (
    <>
      <h1>Phonebook</h1>
      <SearchFilter filter={filter} setFilter={setFilter} />
      <AddPersonForm addPerson={addPerson} newName={newName} newNumber={newNumber}
        setNewName={setNewName} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </>
  );
};

export default App;