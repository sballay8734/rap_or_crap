import "./hardcore.scss"
import MultiAnswerSelect from "../../components/MultiAnswerSelect/MultiAnswerSelect"
import { useEffect, useState } from "react"
import lyrics from "../../data/lyrics"
import useAnswers from "../../hooks/useAnswers"
import HardcoreModal from "../../components/HardcoreModal/HardcoreModal"
import { createPortal } from "react-dom"
import useLyrics from "../../hooks/useLyrics"
import OutOfLyrics from "../../components/OutOfLyrics/OutOfLyrics"

function Hardcore() {
  const [inputValue, setInputValue] = useState("")
  const [gameSetup, setGameSetup] = useState(true)
  const [gameStart, setGameStart] = useState(false)
  const [lyric, setLyric] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [clearAnswers, setClearAnswers] = useState(false)
  const [outOfLyrics, setOutOfLyrics] = useState(false)

  const { players, setPlayers } = useAnswers()
  const { usedLyrics, setUsedLyrics } = useLyrics()

  function handleInputChange(value) {
    setInputValue(value)
  }

  function handleAddPlayer(e) {
    e.preventDefault()
    const updatedPlayers = [
      ...players,
      { name: inputValue, correct: 0, incorrect: 0, currentAnswer: null }
    ]
    localStorage.setItem("players", JSON.stringify(updatedPlayers))
    setPlayers(updatedPlayers)
    setInputValue("")
  }

  function handlePlayerRemove(player) {
    let newPlayersList = players.filter((item) => {
      return item !== player
    })
    setPlayers(newPlayersList)
    localStorage.setItem("players", JSON.stringify(newPlayersList))
  }

  function handleGameStart() {
    // need to load scores and used lyrics here
    handleLyricsUpdate()
    setGameStart(true)
    setGameSetup(false)
  }

  function updateLSPlayers(updatedPlayers) {
    localStorage.setItem("players", JSON.stringify(updatedPlayers))
  }

  function updateLSLyrics(updatedLyrics) {
    localStorage.setItem("usedLyrics", JSON.stringify(updatedLyrics))
  }

  function handleAnswersSubmit() {
    let updatedPlayers = players.map((player) => {
      if (player.currentAnswer === lyric.rap) {
        return { ...player, correct: player.correct + 1 }
      } else {
        return { ...player, incorrect: player.incorrect + 1 }
      }
    })
    let updatedLyrics = [...usedLyrics, lyric]

    setPlayers(updatedPlayers)
    setUsedLyrics(updatedLyrics)
    updateLSPlayers(updatedPlayers)
    updateLSLyrics(updatedLyrics)
    setShowModal(true)

    setClearAnswers(true)
    // console.log(updatedPlayers)
  }

  function handleLyricsUpdate() {
    const usedLyricsLS = JSON.parse(localStorage.getItem("usedLyrics"))
    const separatedLyrics = usedLyricsLS?.map((l) => l.lyric)

    if (usedLyricsLS) {
      const availableLyrics = lyrics.filter(
        (lyric) => !separatedLyrics.includes(lyric.lyric)
      )
      console.log(usedLyricsLS, availableLyrics)

      if (availableLyrics.length === 0) {
        setOutOfLyrics(true)
        return
      }

      const newLyric =
        availableLyrics[Math.floor(Math.random() * availableLyrics.length)]

      setLyric(newLyric)
    } else {
      setLyric(lyrics[Math.floor(Math.random() * lyrics.length)])
    }
  }

  function closeModal() {
    setShowModal(false)
    handleLyricsUpdate()
  }

  useEffect(() => {
    const playersLS = JSON.parse(localStorage.getItem("players"))
    const lyricsLS = JSON.parse(localStorage.getItem("usedLyrics"))
    if (lyricsLS) {
      setUsedLyrics(lyricsLS)
      handleLyricsUpdate()
    }
    if (playersLS) {
      setPlayers(playersLS)
      handleGameStart()
    }
  }, [])

  return (
    <div className="game-wrapper">
      {outOfLyrics ? <OutOfLyrics players={players} /> : ""}
      {gameSetup && !outOfLyrics ? (
        <>
          <div className="top-wrapper">
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
                  Add Player
                </button>
              </form>
            </div>
            <div className="spacer"></div>
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
            </div>
          </div>
          <button className="begin-button" onClick={handleGameStart}>
            Begin Game
          </button>
        </>
      ) : (
        ""
      )}
      {gameStart && !outOfLyrics ? (
        <>
          <div className="rap">{lyric ? lyric.lyric : ""}</div>
          <div className="player-answers">
            {players.map((player) => {
              return (
                <MultiAnswerSelect
                  key={player.name}
                  player={player}
                  clearAnswers={clearAnswers}
                  showAnswerButtons={true}
                />
              )
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
              setClearAnswers={setClearAnswers}
            />,
            document.querySelector(".modal-container")
          )
        : ""}
    </div>
  )
}

export default Hardcore
