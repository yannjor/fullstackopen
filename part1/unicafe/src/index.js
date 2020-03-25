import React, { useState } from 'react';
import ReactDOM from 'react-dom';





const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, total }) => {
  if (total === 0) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    );
  } else {
    return (
      <>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <Statistic text="Good" value={good} />
            <Statistic text="Neutral" value={neutral} />
            <Statistic text="Bad" value={bad} />
            <Statistic text="All" value={total} />
            <Statistic text="Average" value={(good - bad) / total} />
            <Statistic text="Positive" value={(good / total) * 100 + ' %'} />
          </tbody>
        </table>
      </>
    );

  }
};

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  );
};


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const totalFeedback = good + bad + neutral;

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} total={totalFeedback} />
    </div>
  );
};

ReactDOM.render(<App />,
  document.getElementById('root')
);