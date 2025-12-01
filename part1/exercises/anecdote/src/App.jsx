import { useState } from 'react'

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
  const [mostVotedIndex, setMostVotedIndex] = useState(0)
  
  const getRandomIndex = (max = anecdotes.length) => {
    return Math.floor(Math.random() * max)
  }

  const handleChangeIndex = () => {
    let randomIndex = getRandomIndex()
    console.log('random index is', randomIndex)
    if (randomIndex === selected) {
      console.log('random index is the same as the selected value')
      randomIndex = getRandomIndex()
      console.log('changing random index to', randomIndex)
    }
      
    console.log('setting selected to', randomIndex)
    setSelected(randomIndex)
  }

  const handleAnecdoteVoting = () => {
    setVotes(prevVotes => {
      const updatedVotes = [...prevVotes]
      updatedVotes[selected] += 1

      const mostVoted = updatedVotes.indexOf(Math.max(...updatedVotes))
      setMostVotedIndex(mostVoted)

      return updatedVotes
    })
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <div>
        <button onClick={handleAnecdoteVoting}>vote</button>
        <button onClick={handleChangeIndex}>next anecdote</button>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        {anecdotes[mostVotedIndex]}
        <p>has {votes[mostVotedIndex]} votes</p>
      </div>
    </div>
  )
}

export default App