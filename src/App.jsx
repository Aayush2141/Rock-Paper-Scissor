import { useState } from "react";

export default function App() {
  const [userMove, setUserMove] = useState("Paper");
  const [ComputerMove, setComputerMove] = useState("Paper");
  const [rounds, setRounds] = useState(0);
  const [winner, setWinner] = useState("Let's Play!");
  const [streak, setStreak] = useState(0);
  const [history, setHistory] = useState([]);
  const [score, setScore] = useState({ wins: 0, losses: 0, ties: 0 });

  let emojisData = { "Rock": "🪨", "Paper": "📄", "Scissor": "✂️" };

  function generateComputerMove() {
    let value = Math.random();
    if (value < 0.33) {
      return "Rock";
    } else if (value < 0.67) {
      return "Paper";
    } else {
      return "Scissor";
    }
  }

  function handleClick(move) {
    setUserMove(move);
    let computermove = generateComputerMove();
    setComputerMove(computermove);
    setRounds(rounds + 1);

    if (move === computermove) {
      setWinner("It's a Tie!");
      setStreak(0);
      setScore(prev => ({ ...prev, ties: prev.ties + 1 }));
    } else if (
      (move === "Rock" && computermove === "Scissor") ||
      (move === "Paper" && computermove === "Rock") ||
      (move === "Scissor" && computermove === "Paper")
    ) {
      setWinner("You Won!");
      setStreak(streak + 1);
      setScore(prev => ({ ...prev, wins: prev.wins + 1 }));
    } else {
      setWinner("Computer Won!");
      setStreak(0);
      setScore(prev => ({ ...prev, losses: prev.losses + 1 }));
    }

    let entry = "Round " + (rounds + 1) + ": " + move + " vs " + computermove;
    setHistory([entry, ...history]);
  }

  function resetGame() {
    setRounds(0);
    setStreak(0);
    setWinner("Let's Play!");
    setHistory([]);
    setUserMove("Paper");
    setComputerMove("Paper");
    setScore({ wins: 0, losses: 0, ties: 0 }); 
  }

  return (
    <div>
      <h1>Computer | You</h1>
      <h1>{emojisData[ComputerMove]} | {emojisData[userMove]}</h1>
      <h2>{winner}</h2>

      <button onClick={() => handleClick("Rock")}>🪨</button>
      <button onClick={() => handleClick("Scissor")}>✂️</button>
      <button onClick={() => handleClick("Paper")}>📄</button>

      <p>Rounds Played: {rounds}</p>
      <p>Win Streak: {streak}</p>
      <p>✅ Wins: {score.wins} | ❌ Losses: {score.losses} | 🤝 Ties: {score.ties}</p>

      <button onClick={resetGame}>Reset Game</button>
      <hr />
      <h3>History</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}