/* eslint-disable react/prop-types */
import "./multi-answer.scss"
import { useEffect, useState } from "react"

function MultiAnswerSelect({ player, clearAnswers, showAnswerButtons }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const percentageCorrect =
    (player.correct / (player.correct + player.incorrect)) * 100

  function handleAnswerSelect(answer, player) {
    setSelectedAnswer(answer)
    player.currentAnswer = answer
  }

  useEffect(() => {
    if (clearAnswers) {
      setSelectedAnswer(null)
    }
  }, [clearAnswers])

  return (
    <div key={player} className="player-answer-select">
      <div className="player-name">
        <div className="name">{player.name}</div>
        <div className="bar-wrapper">
          <div
            className="bar"
            style={{
              width: `${percentageCorrect}%` || 0
            }}
          ></div>
        </div>
      </div>
      {showAnswerButtons ? (
        <div className="btn-wrapper">
          <button
            onClick={() => handleAnswerSelect(true, player)}
            className={`rap-btn ${selectedAnswer ? "active" : ""}`}
          >
            Rap
          </button>
          {/* {selectedAnswer === null ? <div className="spacer"></div> : ""} */}
          <button
            onClick={() => handleAnswerSelect(false, player)}
            className={`crap-btn ${selectedAnswer === false ? "active" : ""}`}
          >
            Crap
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default MultiAnswerSelect
