//* START Exercise 1.6 - 1.11*: unicafe step 1 - step 6

import { useState } from "react";

const Header = () => {
  return (
    <>
      <h1>Give Feedback</h1>
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, total, avg, positivePercent }) => {
  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total" value={total} />
          <StatisticLine text="Average" value={avg} />
          <StatisticLine text="Positive" value={`${positivePercent} %`} />
        </tbody>
      </table>
    );
  }
};

const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const goodScore = 1;
  const neutralScore = 0;
  const badScore = -1;
  const reviewPoints =
    good * goodScore + neutral * neutralScore + bad * badScore;
  const avg = total === 0 ? 0 : reviewPoints / total;

  const positivePercent = (good / total) * 100;

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header />
      <Button onClick={handleGoodClick} text="Good" />
      <Button onClick={handleNeutralClick} text="Neutral" />
      <Button onClick={handleBadClick} text="Bad" />
      <h2>Statistics</h2>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        avg={avg}
        positivePercent={positivePercent}
      />
    </div>
  );
};

export default App;
