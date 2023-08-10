import "./hardcore.scss"
import MultiAnswerSelect from "../../components/MultiAnswerSelect/MultiAnswerSelect"
import { useEffect, useState } from "react"

function Hardcore() {
  const [players, setPlayers] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [gameSetup, setGameSetup] = useState(true)
  const [gameStart, setGameStart] = useState(false)

  function handleInputChange(value) {
    setInputValue(value)
  }

  function handleAddPlayer(e) {
    e.preventDefault()
    setPlayers([...players, inputValue])
    setInputValue("")
  }

  function handlePlayerRemove(player) {
    let newPlayersList = players.filter((item) => {
      return item !== player
    })
    setPlayers(newPlayersList)
  }

  function handleGameStart() {
    setGameStart(true)
    setGameSetup(false)
  }

  useEffect(() => {
    // need to load players, score, and available lyrics from LS if they exist.
    // on refresh, these items should be set FROM local storage.
  }, [])

  return (
    <div>
      {gameSetup ? (
        <>
          <div className="instructions">
            Before you begin, please add players
          </div>
          <div className="input-wrapper">
            <form action="submit" className="input-form">
              <input
                maxLength={15}
                onChange={(e) => handleInputChange(e.target.value)}
                type="text"
                className="player-add"
                value={inputValue}
              />
              <button
                type="submit"
                onClick={(e) => handleAddPlayer(e)}
                className="add-player-btn"
              >
                Add
              </button>
            </form>
          </div>
          <div className="player-list">
            {players.map((player) => {
              return (
                <div className="player" key={player}>
                  <div className="player-name">{player}</div>
                  <button
                    onClick={() => handlePlayerRemove(player)}
                    className="remove-player"
                  >
                    Remove
                  </button>
                </div>
              )
            })}
            <button onClick={handleGameStart}>Begin Game</button>
          </div>
        </>
      ) : (
        ""
      )}
      {gameStart ? (
        <>
          <div className="rap">Rap goes here... yo</div>
          <div className="player-answers">
            {players.map((player) => {
              return <MultiAnswerSelect key={player} player={player} />
            })}
          </div>
          <button className="submit-all-answers">Submit Answers</button>
        </>
      ) : (
        ""
      )}
    </div>
  )
}

export default Hardcore
