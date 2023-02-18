import { useState } from 'react';

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);

const StatisticsCell = ({ text, value }) => (
  <tr>  
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const calculateTotal = () => {
    return good + neutral + bad;
  };

  const calculateAverageScore = () => {
    return (good - bad) / (good + neutral + bad);
  };

  const calculatePercentagePositive = () => {
    return (good / (good + neutral + bad)) * 100;
  };

  return (
    <div> 
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsCell text="Good" value={good} />
          <StatisticsCell text="Neutral" value={neutral} />
          <StatisticsCell text="Bad" value={bad} />
          <StatisticsCell text="Total" value={calculateTotal()} />
          <StatisticsCell text="Average Score" value={calculateAverageScore()} />
          <StatisticsCell text="Percentage Positive" value={calculatePercentagePositive()} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const [hasFeedback, setHasFeedback] = useState(false);

  const handleFeedback = (feedback) => () => {
    setFeedback((prev) => ({
      ...prev,
      [feedback]: prev[feedback] + 1,
    }));
    setHasFeedback(true);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleFeedback('good')} text="Good" />
      <Button onClick={handleFeedback('neutral')} text="Neutral" />
      <Button onClick={handleFeedback('bad')} text="Bad" />
      {hasFeedback ? 
        (<Statistics good={feedback.good} neutral={feedback.neutral} bad={feedback.bad}/>) : null}
    </div>
  );
};

export default App;
