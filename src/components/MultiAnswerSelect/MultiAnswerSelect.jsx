/* eslint-disable react/prop-types */
import "./multi-answer.scss"
import { useEffect, useState } from "react"
import useAnswers from "../../hooks/useAnswers"

function MultiAnswerSelect({ player, clearAnswers, showAnswerButtons }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const { players, setPlayers } = useAnswers()
  const percentageCorrect =
    (player.correct / (player.correct + player.incorrect)) * 100

  function handleAnswerSelect(answer, player) {
    setSelectedAnswer(answer)
    player.currentAnswer = answer

    let updatedPlayers = players.map((p) => {
      if (p.name === player.name) {
        return player
      } else {
        return p
      }
    })

    setPlayers(updatedPlayers)
    localStorage.setItem("players", JSON.stringify(updatedPlayers))
  }

  useEffect(() => {
    if (clearAnswers) {
      setSelectedAnswer(null)
    }
  }, [clearAnswers])

  function handleColorChange(percentageCorrect) {
    if (percentageCorrect < 10) {
      return "red-worst"
    } else if (percentageCorrect < 20) {
      return "red"
    } else if (percentageCorrect < 30) {
      return "orange-worst"
    } else if (percentageCorrect < 40) {
      return "orange"
    } else if (percentageCorrect < 50) {
      return "yellow"
    } else if (percentageCorrect < 60) {
      return "light-green-worst"
    } else if (percentageCorrect < 70) {
      return "light-green"
    } else if (percentageCorrect < 80) {
      return "green-worst"
    } else if (percentageCorrect <= 100) {
      return "green"
    } else {
      return ""
    }
  }

  return (
    <div key={player} className="player-answer-select">
      <div className="player-name-2">
        <div className={`score-icon ${handleColorChange(percentageCorrect)}`}>
          {player.correct}/{player.incorrect + player.correct}
        </div>
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
