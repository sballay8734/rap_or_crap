/* eslint-disable react/prop-types */
import "./multi-answer.scss"
import { useState } from "react"

function MultiAnswerSelect({ player }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  function handleAnswerSelect(answer) {
    setSelectedAnswer(answer)
    console.log(selectedAnswer)
  }

  return (
    <div key={player} className="player">
      <div className="player-name">{player}</div>
      <div className="btn-wrapper">
        <button
          onClick={() => handleAnswerSelect(true)}
          className={`rap-btn ${selectedAnswer ? "active" : ""}`}
        >
          Rap
        </button>
        {selectedAnswer === null ? <div className="spacer"></div> : ""}
        <button
          onClick={() => handleAnswerSelect(false)}
          className={`crap-btn ${selectedAnswer === false ? "active" : ""}`}
        >
          Crap
        </button>
      </div>
    </div>
  )
}

export default MultiAnswerSelect
