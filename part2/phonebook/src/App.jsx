import { useState, useEffect } from "react";

import PersonForm from "./PersonForm";
import Filter from "./Filter";
import Persons from "./Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => setPersons(response.data));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find((p) => p.name === newName);
    if (person) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one`
        )
      ) {
        const changedPerson = { ...person, number: newNumber };
        personService.update(person.id, changedPerson).then((response) => {
          setPersons(
            persons.map((p) => (p.id === person.id ? response.data : p))
          );
          setNewName("");
          setNewNumber("");
        });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService.create(newPerson).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => setPersons(persons.filter((p) => p.id !== person.id)));
    }
  };

  // Event handlers
  const handleFilterChange = ({ target }) => {
    setFilter(target.value);
  };
  const handleNameChange = ({ target }) => {
    setNewName(target.value);
  };
  const handleNumberChange = ({ target }) => {
    setNewNumber(target.value);
  };

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h2>Add a new person</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
