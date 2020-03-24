import React from 'react';
import ReactDOM from 'react-dom';



const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};


const Part = (props) => {
  return (
    <>
      <p>{props.parts.name} {props.parts.exercises}</p>
    </>
  );
};


const Content = (props) => {
  return (
    <>
      {props.parts.map(part => <Part parts={part} />)}
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.exercises.reduce((acc, val) => acc + val)}</p>
    </>
  );
};


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map(part => part.exercises)} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));