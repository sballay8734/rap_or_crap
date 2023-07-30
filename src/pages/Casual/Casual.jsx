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

  function pushToLocaleStorage(currentLyric) {
    let usedLyrics = JSON.parse(localStorage.getItem("usedLyrics"))
    if (noAvailableLyrics) return

    if (usedLyrics === null) {
      let array = [currentLyric]
      localStorage.setItem("usedLyrics", JSON.stringify(array))
    } else {
      let updatedLyrics = [...usedLyrics, currentLyric]
      localStorage.setItem("usedLyrics", JSON.stringify(updatedLyrics))
    }
    console.log(localStorage.getItem("usedLyrics"))
  }

  function handleMemoryClear() {
    localStorage.clear()
    setNoAvailableLyrics(false)
    handleInitialLoad()
  }

  function handleAnswerSelect(currentLyric, answer) {
    pushToLocaleStorage(currentLyric)

    // modal logic
    let currentLyricObject = lyrics.filter((l) => l.lyric === currentLyric)
    if (currentLyricObject[0].rap === answer) {
      setCorrectAnswers((prev) => prev + 1)
      // show modal
      console.log("You got it right", answer, currentLyricObject[0].rap)
    } else {
      setIncorrectAnswers((prev) => prev + 1)
      // show modal
      console.log("WRONG", answer, currentLyricObject[0].rap)
    }

    // update available lyrics
    let availableLyrics = lyrics.filter(
      (item) =>
        !JSON.parse(localStorage.getItem("usedLyrics")).includes(item.lyric)
    )
    if (availableLyrics.length === 0) {
      console.log("No more lyrics available")
      setNoAvailableLyrics(true)
      setCurrentLyric(null)
      // handle NO MORE LYRICS
    } else {
      setCurrentLyric(
        availableLyrics[Math.floor(Math.random() * availableLyrics.length)]
          .lyric
      )
    }
  }

  function handleInitialLoad() {
    if (!localStorage.getItem("usedLyrics")) {
      setCurrentLyric(lyrics[Math.floor(Math.random() * lyrics.length)].lyric)
    } else {
      let availableLyrics = lyrics.filter(
        (item) =>
          !JSON.parse(localStorage.getItem("usedLyrics")).includes(item.lyric)
      )
      setCurrentLyric(
        availableLyrics[Math.floor(Math.random() * availableLyrics?.length)]
          ?.lyric
      )
      if (availableLyrics.length === 0) {
        console.log("No more lyrics available")
        setNoAvailableLyrics(true)
        setCurrentLyric(null)
        // handle NO MORE LYRICS
      }
    }
  }

  useEffect(() => {
    handleInitialLoad()
  }, [])

  return (
    <div className="test">
      <div className="lyric">{currentLyric}</div>
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
      <ResultModal />
      {modalIsShown
        ? createPortal(
            <ResultModal />,
            document.querySelector(".modal-container")
          )
        : ""}

      {noAvailableLyrics ? (
        <div>
          <div>
            There are no more lyrics available at this time. Click here to clear
            memory and start again.{" "}
          </div>
          <div className="button-div">
            <button onClick={() => handleMemoryClear()}>Clear Memory</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default Casual
