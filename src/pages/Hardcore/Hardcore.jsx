import "./hardcore.scss"
import MultiAnswerSelect from "../../components/MultiAnswerSelect/MultiAnswerSelect"
import { useEffect, useState } from "react"
import lyrics from "../../data/lyrics"
import useAnswers from "../../hooks/useAnswers"
import HardcoreModal from "../../components/HardcoreModal/HardcoreModal"
import { createPortal } from "react-dom"
import useLyrics from "../../hooks/useLyrics"

function Hardcore() {
  const [inputValue, setInputValue] = useState("")
  const [gameSetup, setGameSetup] = useState(true)
  const [gameStart, setGameStart] = useState(false)
  const [lyric, setLyric] = useState("")
  const [showModal, setShowModal] = useState(false)

  const { players, setPlayers } = useAnswers()
  const { usedLyrics, setUsedLyrics } = useLyrics()

  function handleInputChange(value) {
    setInputValue(value)
  }

  function handleAddPlayer(e) {
    e.preventDefault()
    setPlayers([
      ...players,
      { name: inputValue, correct: 0, incorrect: 0, currentAnswer: null }
    ])
    setInputValue("")
  }

  function handlePlayerRemove(player) {
    let newPlayersList = players.filter((item) => {
      return item !== player
    })
    setPlayers(newPlayersList)
  }

  function handleGameStart() {
    let availableLyrics = lyrics.filter((l) => !usedLyrics.includes(l))

    setLyric(
      availableLyrics[Math.floor(Math.random() * availableLyrics.length)]
    )
    setGameStart(true)
    setGameSetup(false)
  }

  function handleAnswersSubmit() {
    let updatedPlayers = players.map((player) => {
      if (player.currentAnswer === lyric.rap) {
        const modifiedPlayer = { ...player }
        modifiedPlayer.correct = modifiedPlayer.correct + 1
        return modifiedPlayer
      } else {
        const modifiedPlayer = { ...player }
        modifiedPlayer.incorrect = modifiedPlayer.incorrect + 1
        return modifiedPlayer
      }
    })
    setPlayers(updatedPlayers)
    console.log(updatedPlayers)
    setUsedLyrics([...usedLyrics, lyric])
    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
    const availableLyrics = lyrics.filter(
      (lyric) => !usedLyrics.includes(lyric)
    )
    const newLyric =
      availableLyrics[Math.floor(Math.random() * availableLyrics.length)]

    setLyric(newLyric)
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
                <div className="player" key={player.name}>
                  <div className="player-name">{player.name}</div>
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
          <div className="rap">{lyric.lyric}</div>
          <div className="player-answers">
            {players.map((player) => {
              return <MultiAnswerSelect key={player.name} player={player} />
            })}
          </div>
          <button onClick={handleAnswersSubmit} className="submit-all-answers">
            Submit Answers
          </button>
        </>
      ) : (
        ""
      )}
      {showModal
        ? createPortal(
            <HardcoreModal
              lyric={lyric}
              closeModal={closeModal}
              players={players}
            />,
            document.querySelector(".modal-container")
          )
        : ""}
    </div>
  )
}

export default Hardcore
