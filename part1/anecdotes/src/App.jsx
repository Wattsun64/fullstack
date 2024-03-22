import { useState } from 'react'

const Heading = ({text}) => <h1>{text}</h1>
const Button = ({onClickHandler, text}) => <button onClick={onClickHandler}>{text}</button>
const HighestRankedAnecdote = ({anecdotes, votes}) => {
  const max = Math.max(...votes)
  const idx = votes.indexOf(max)

  return (
    <>
      <Heading text="Anecdote with most votes" />
      <p>{anecdotes[idx]}</p>
      <p>has {max} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const anecdotesHanlder = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  const votesHanlder = () => {
    const updated = [...votes]
    updated[selected] = votes[selected] + 1
    setVotes(updated)
  }

  return (
    <div>
      <Heading text="Anecdote of the day" />
      {anecdotes[selected]}
      <br />
      <p>{selected} has {votes[selected]} votes</p>
      <Button onClickHandler={votesHanlder} text="vote" />
      <Button onClickHandler={anecdotesHanlder} text="next anecdote"/>
      <HighestRankedAnecdote votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App
