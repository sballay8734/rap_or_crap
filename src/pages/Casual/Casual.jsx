import "./casual.scss"
// import { LyricsContext } from "../../context/LyricsContext"
import { useEffect, useState } from "react"
import lyrics from "../../data/lyrics"
import ResultModal from "../../components/ResultModal/ResultModal"
import { createPortal } from "react-dom"
import useLyrics from "../../hooks/useLyrics"

function Casual() {
  const [currentLyric, setCurrentLyric] = useState("")
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const [noAvailableLyrics, setNoAvailableLyrics] = useState(false)
  const [modalIsShown, setModalIsShown] = useState(false)
  const [answerResult, setAnswerResult] = useState(null)

  const { usedLyrics, setUsedLyrics } = useLyrics()

  function handleMemoryClear() {
    localStorage.clear()
    setNoAvailableLyrics(false)
    setCorrectAnswers(0)
    setIncorrectAnswers(0)
    handleInitialLoad()
  }

  function handleInitialLoad() {
    const usedLyricsLS = JSON.parse(localStorage.getItem("usedLyrics"))
    const currentLyricLS = JSON.parse(localStorage.getItem("currentLyric"))
    const scoreboard = JSON.parse(localStorage.getItem("score"))

    if (scoreboard) {
      setCorrectAnswers(scoreboard.correct)
      setIncorrectAnswers(scoreboard.incorrect)
    }

    if (usedLyricsLS?.includes(currentLyricLS?.lyric)) {
      setNoAvailableLyrics(true)
      return
    }

    if (usedLyricsLS) {
      setUsedLyrics(usedLyricsLS)
      setCurrentLyric(currentLyricLS || "")
    } else {
      let currentLyric = lyrics[Math.floor(Math.random() * lyrics.length)]
      setCurrentLyric(currentLyric)
      localStorage.setItem("usedLyrics", JSON.stringify([]))
      localStorage.setItem("currentLyric", JSON.stringify(currentLyric))
      localStorage.setItem(
        "score",
        JSON.stringify({ correct: 0, incorrect: 0 })
      )
      console.log("run")
    }
  }

  function handleAnswerSelect(answer, currentLyric) {
    updateLS(currentLyric)

    if (answer === currentLyric.rap) {
      setCorrectAnswers((prev) => prev + 1)
      setAnswerResult(true)
      // NEED TO UPDATE CORRECT ANSWERS ONLY USING ...
      let scoreLS = JSON.parse(localStorage.getItem("score"))
      let newCorrectScoreLS = scoreLS["correct"] + 1
      let incorrectScore = scoreLS["incorrect"]
      localStorage.setItem(
        "score",
        JSON.stringify({
          correct: newCorrectScoreLS,
          incorrect: incorrectScore
        })
      )
    } else {
      setIncorrectAnswers((prev) => prev + 1)
      setAnswerResult(false)
      let scoreLS = JSON.parse(localStorage.getItem("score"))
      let correctScoreLS = scoreLS["correct"]
      let newIncorrectScore = scoreLS["incorrect"] + 1
      localStorage.setItem(
        "score",
        JSON.stringify({
          correct: correctScoreLS,
          incorrect: newIncorrectScore
        })
      )
    }

    setModalIsShown(true)
  }

  function updateLS(currentLyric) {
    let usedLyricsLS = JSON.parse(localStorage.getItem("usedLyrics"))
    if (usedLyricsLS?.includes(currentLyric.lyric)) return

    localStorage.setItem(
      "usedLyrics",
      JSON.stringify([...usedLyricsLS, currentLyric.lyric])
    )

    setUsedLyrics([...usedLyrics, currentLyric.lyric])
  }

  useEffect(() => {
    handleInitialLoad()
  }, [])

  return (
    <div className="test">
      {!noAvailableLyrics ? (
        <>
          <div className="lyric">
            {currentLyric.lyric ? currentLyric.lyric : "No More Lyrics"}
          </div>
          <div className="answer-buttons">
            <button
              onClick={() => handleAnswerSelect(true, currentLyric)}
              className="rap btn"
            >
              Rap
            </button>
            <button
              onClick={() => handleAnswerSelect(false, currentLyric)}
              className="crap btn"
            >
              Crap
            </button>
          </div>
          <div className="scoreboard">
            Correct: {correctAnswers} Incorrect: {incorrectAnswers}
          </div>
          {modalIsShown
            ? createPortal(
                <ResultModal
                  currentLyric={currentLyric}
                  setCurrentLyric={setCurrentLyric}
                  setModalIsShown={setModalIsShown}
                  setNoAvailableLyrics={setNoAvailableLyrics}
                  answerResult={answerResult}
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
