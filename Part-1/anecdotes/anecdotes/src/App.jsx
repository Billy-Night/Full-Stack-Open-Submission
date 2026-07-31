//* START of exercise 1.12* - 1.14*: anecdotes step 1 - anecdote step 3

import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const highestVoteCount = Math.max(...votes);
  const mostVotedIndex = votes.indexOf(highestVoteCount);

  const handleVote = () => {
    const voteCopyArr = [...votes];

    voteCopyArr[selected] += 1;
    setVotes(voteCopyArr);
  };

  const handleNextAnecdote = () => {
    if (anecdotes.length <= 1) return;

    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * anecdotes.length);
    } while (randomIndex === selected);

    setSelected(randomIndex);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>Votes: {votes[selected]}</div>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleNextAnecdote}>Random Anecdote</button>
      <h2>Anecdote with the most votes</h2>
      {highestVoteCount === 0 ? (
        <p>Please vote</p>
      ) : (
        <>
          <p>{anecdotes[mostVotedIndex]}</p>
          <p>Number of votes: {highestVoteCount}</p>
        </>
      )}
    </div>
  );
};

export default App;

//! END of exercise 1.12* - 1.14*: anecdotes step 1 - anecdote step 3
