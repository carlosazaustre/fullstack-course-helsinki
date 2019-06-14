import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Statistic = ({ text, value }) => {
  return <p>{text} {value}</p>;
}

const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad;
  let average = (good + bad * (-1)) / all;
  let positive = (good / all) * 100;
  
  if ((good || neutral || bad) !== 0) {
    return (
      <>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={positive} />
      </>
    );
  }
  
  return <div>No feedback given</div>
}

const App = () => {
  // Save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  // const handleGood = () => setGood(good + 1);
  const handleGood = () => console.log(good);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClickButton={handleGood} />
      <Button text="neutral" onClickButton={handleNeutral} />
      <Button text="bad" onClickButton={handleBad} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}
const Button = ({ text, onClickButton }) => {
  // return <Button onClick={handleClick}>{text}</Button>;
  return (
    <button onClick={onClickButton}>{text}</button>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
