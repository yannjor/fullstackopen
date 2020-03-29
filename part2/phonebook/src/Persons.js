import React from 'react';
import Person from './Person';

const Persons = ({ persons, filter }) => {
    if (filter === '') {
        return (
            <>
                {persons.map(person => <Person key={person.name} name={person.name}
                    number={person.number} />)}
            </>
        );
    } else {
        const personsFiltered = persons.filter(person =>
            person.name.toLowerCase().includes(filter.toLowerCase()));
        return (
            <>
                {personsFiltered.map(person => <Person key={person.name} name={person.name}
                    number={person.number} />)}
            </>
        );

    }
};

export default Persons;
