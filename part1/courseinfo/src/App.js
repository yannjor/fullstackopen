const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  );
};

const Part = ({ parts }) => {
  return (
    <>
      <p>
        {parts.name} {parts.exercises}
      </p>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part parts={part} />
      ))}
    </>
  );
};

const Total = ({ exercises }) => {
  return (
    <>
      <p>Number of exercises {exercises.reduce((acc, val) => acc + val)}</p>
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map((part) => part.exercises)} />
    </div>
  );
};

export default App;
