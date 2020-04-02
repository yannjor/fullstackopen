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
  const [notificationMsg, setNotificationMsg] = useState(null);

  const db_url = 'http://localhost:3001/persons';

  useEffect(() => {
    axios.get(db_url).then(res => {
      setPersons(res.data);
    });
  }, []);



  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName);
        const changedPerson = { ...person, number: newNumber };
        axios
          .put(db_url.concat(`/${person.id}`), changedPerson)
          .then(res => {
            setPersons(persons.map(p => p.id === person.id ? res.data : p));
            setNewName('');
            setNewNumber('');
            setNotificationMsg(`Added ${newName}`);
            setTimeout(() => {
              setNotificationMsg(null);
            }, 3000);
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      axios
        .post(db_url, newPerson)
        .then(res => {
          setPersons(persons.concat(newPerson));
          setNewName('');
          setNewNumber('');
        });
    }
  };


  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      axios
        .delete(db_url.concat(`/${person.id}`))
        .then(res => {
          setPersons(persons.filter(p => p.id !== person.id));
        });
    }
  };


  return (
    <>
      <h1>Phonebook</h1>
      <SearchFilter filter={filter} setFilter={setFilter} />
      <AddPersonForm addPerson={addPerson} newName={newName} newNumber={newNumber}
        setNewName={setNewName} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        deletePerson={deletePerson}
      />
    </>
  );
};

export default App;