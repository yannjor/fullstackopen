import Person from "./Person";

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((p) => (
        <Person key={p.name} person={p} deletePerson={deletePerson} />
      ))}
    </div>
  );
};

export default Persons;
