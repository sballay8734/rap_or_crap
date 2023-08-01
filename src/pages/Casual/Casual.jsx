import "./casual.scss"
// import { LyricsContext } from "../../context/LyricsContext"
import { useEffect, useState } from "react"
import lyrics from "../../data/lyrics"
import ResultModal from "../../components/ResultModal/ResultModal"
import { createPortal } from "react-dom"

function Casual() {
  const [currentLyric, setCurrentLyric] = useState("")
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const [noAvailableLyrics, setNoAvailableLyrics] = useState(false)
  const [modalIsShown, setModalIsShown] = useState(false)
  const [result, setResult] = useState(null)

  function handleMemoryClear() {
    localStorage.clear()
    setNoAvailableLyrics(false)
    handleInitialLoad()
  }

  function handleAnswerSelect(currentLyric, answer) {
    // modal logic
    if (currentLyric.rap === answer) {
      setCorrectAnswers((prev) => prev + 1)
      setResult("CORRECT")
      setModalIsShown(true)
      console.log("You got it right", answer, currentLyric.rap)
    } else {
      setIncorrectAnswers((prev) => prev + 1)
      setResult("WRONG")
      setModalIsShown(true)
      console.log("WRONG", answer, currentLyric.rap)
    }
  }

  function handleInitialLoad() {
    setCurrentLyric(lyrics[Math.floor(Math.random() * lyrics.length)])
  }

  useEffect(() => {
    handleInitialLoad()
  }, [])

  return (
    <div className="test">
      {!noAvailableLyrics ? (
        <>
          <div className="lyric">{currentLyric.lyric}</div>
          <div className="answer-buttons">
            <button
              onClick={() => handleAnswerSelect(currentLyric, true)}
              className="rap btn"
            >
              Rap
            </button>
            <button
              onClick={() => handleAnswerSelect(currentLyric, false)}
              className="crap btn"
            >
              Crap
            </button>
          </div>
          <div className="scoreboard">
            Correct: {correctAnswers} Incorrect: {incorrectAnswers}
          </div>
          {/* <ResultModal /> */}
          {modalIsShown
            ? createPortal(
                <ResultModal
                  currentLyric={currentLyric}
                  result={result}
                  setModalIsShown={setModalIsShown}
                />,
                document.querySelector(".modal-container")
              )
            : ""}
        </>
      ) : (
        ""
      )}

      {noAvailableLyrics ? (
        <div className="no-more-lyrics">
          <div>
            There are no more lyrics available at this time. Click here to clear
            memory and start again.{" "}
          </div>
          <div className="button-div">
            <button onClick={() => handleMemoryClear()}>Clear Memory</button>
          </div>
          <div className="scoreboard">
            Correct: {correctAnswers} Incorrect: {incorrectAnswers}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default Casual
