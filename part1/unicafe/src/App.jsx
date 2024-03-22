import { useState } from 'react'

const Heading = ({text}) => <h1>{text}</h1>
const Button = ({onClickHandle, text}) => <button onClick={onClickHandle}>{text}</button>
const StatisticLine = ({text, value}) => (<tr><td>{text} {value}</td></tr>)

const Statistics = ({title, obs, avg, pos, neu, bad}) => {
  const posPerc = `${((pos / obs) * 100).toFixed(2)}%`
  const av = (avg / obs).toFixed(1)
  if (!obs)
    return (<p>No feedback given</p>)
  return (
    <>
      <Heading text={title} />
      <table>
        <tbody>
          <StatisticLine text="good" value={pos} />
          <StatisticLine text="neutral" value={neu} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={obs} />
          <StatisticLine text="average" value={av} />
          <StatisticLine text="positive" value={posPerc} />
        </tbody>
      </table>
    </>
  )
}

function App() {
  const heading1 = 'give feedback'
  const heading2 = 'statistics'

  const [observations, setOb] = useState(0)
  const [average, setAvg] = useState(0)

  const [good, setGood] = useState(0)
  const handleGoodFeedback = () => {
    setOb(observations + 1)
    setAvg(average + 1)
    setGood(good + 1)
  };

  const [neutral, setNeutral] = useState(0)
  const handleNeutralFeedback = () => {
    setOb(observations + 1)
    setAvg(average + 0)
    setNeutral(neutral + 1)
  }

  const [bad, setBad] = useState(0)
  const handleBadFeedback = () => {
    setOb(observations + 1)
    setAvg(average + -1)
    setBad(bad + 1)
  }

  return (
    <div>
      <Heading text={heading1} />
      <Button onClickHandle={handleGoodFeedback} text="good" />
      <Button onClickHandle={handleNeutralFeedback} text="neutral" />
      <Button onClickHandle={handleBadFeedback} text="bad" />
      <Statistics title={heading2} obs={observations} avg={average} pos={good} neu={neutral} bad={bad} />
    </div>
  )

}

export default App
