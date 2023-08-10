/* eslint-disable react/prop-types */
import "./multi-answer.scss"
import { useEffect, useState } from "react"

function MultiAnswerSelect({ player, clearAnswers }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  function handleAnswerSelect(answer, player) {
    setSelectedAnswer(answer)
    player.currentAnswer = answer
    console.log(answer)
    console.log(selectedAnswer)
  }

  useEffect(() => {
    if (clearAnswers) {
      setSelectedAnswer(null)
    }
  }, [clearAnswers])

  return (
    <div key={player} className="player">
      <div className="player-name">{player.name}</div>
      <div className="btn-wrapper">
        <button
          onClick={() => handleAnswerSelect(true, player)}
          className={`rap-btn ${selectedAnswer ? "active" : ""}`}
        >
          Rap
        </button>
        {selectedAnswer === null ? <div className="spacer"></div> : ""}
        <button
          onClick={() => handleAnswerSelect(false, player)}
          className={`crap-btn ${selectedAnswer === false ? "active" : ""}`}
        >
          Crap
        </button>
      </div>
    </div>
  )
}

export default MultiAnswerSelect
