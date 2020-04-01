import React from 'react';
import Person from './Person';

const Persons = ({ persons, filter, deletePerson }) => {
    if (filter === '') {
        return (
            <>
                {persons.map(person => <Person key={person.name} person={person} deletePerson={deletePerson} />)}
            </>
        );
    } else {
        const personsFiltered = persons.filter(person =>
            person.name.toLowerCase().includes(filter.toLowerCase()));
        return (
            <>
                {personsFiltered.map(person => <Person key={person.name} person={person} deletePerson={deletePerson} />)}
            </>
        );

    }
};

export default Persons;
