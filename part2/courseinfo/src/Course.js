const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Part = ({ parts }) => {
  return (
    <p>
      {parts.name} {parts.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} parts={part} />
      ))}
    </>
  );
};

const Total = ({ exercises }) => {
  return (
    <>
      <p>
        <strong>
          Total of {exercises.reduce((acc, val) => acc + val)} exercises
        </strong>
      </p>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map((part) => part.exercises)} />
    </>
  );
};

export default Course;
