import "./home.scss"
import { useState } from "react"
import { useNavigate } from "react-router"

function Home() {
  const [selectedMode, setSelectedMode] = useState("casual")

  const navigate = useNavigate()

  function handleGameStart(selectedMode) {
    navigate(selectedMode)
  }

  return (
    <div className="container">
      <div className="logo">Rap or Crap</div>
      <div className="rules">
        <div className="rules-header">
          A simple game. Or so you would think. There are many ways to play this
          game and they all involve drinking. Here are two of our favorites.{" "}
        </div>
        <div className="game-modes">
          <button
            onClick={() => setSelectedMode("casual")}
            className={`game-mode ${selectedMode === "casual" ? "active" : ""}`}
          >
            Casual
          </button>
          <button
            onClick={() => setSelectedMode("hardcore")}
            className={`game-mode ${
              selectedMode === "hardcore" ? "active" : ""
            }`}
          >
            Hardcore
          </button>
        </div>
        {selectedMode === "casual" ? (
          <div className="casual-rules-header">Casual Rules</div>
        ) : (
          <div className="hardcore-rules-header">Hardcore Rules</div>
        )}
      </div>
      <div className="start-game">
        <button
          onClick={() => handleGameStart(selectedMode)}
          className="start-button"
        >
          Start Game in{" "}
          <span className="start-button-mode">
            {selectedMode.slice(0, 1).toLocaleUpperCase() +
              selectedMode.slice(1)}
          </span>{" "}
          Mode
        </button>
      </div>
    </div>
  )
}

export default Home
