import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = ({stats}) => {
  const totalFeedbacks = stats.good + stats.bad + stats.neutral

  if (!totalFeedbacks) {
    return (
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
    )
  }

  const average = (stats.good - stats.bad) / totalFeedbacks
  const positiveFeedbacks = (stats.good / totalFeedbacks) * 100
  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={stats.good} />
          <StatisticLine text="neutral" value={stats.neutral} />
          <StatisticLine text="bad" value={stats.bad} />
          <StatisticLine text="all" value={totalFeedbacks} />
          <StatisticLine text="average" value={average.toFixed(2)} />
          <StatisticLine text="positive" value={positiveFeedbacks.toFixed(2)} />
        </tbody>
      </table>
 
    </>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text} {value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const stats = {good, neutral, bad}

  const handleGoodCounter = () => setGood(g => g + 1)
  const handleBadCounter = () => setBad(g => g + 1)
  const handleNeutralCounter = () => setNeutral(g => g + 1)


  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleGoodCounter} text="good" />
      <Button onClick={handleNeutralCounter} text="neutral" />
      <Button onClick={handleBadCounter} text="bad" />
      <Statistics stats={stats} />
    </div>
  )
}

export default App