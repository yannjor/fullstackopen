import React from 'react';

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

export default AddPersonForm;
