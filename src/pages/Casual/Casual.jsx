import "./casual.scss"
// import { LyricsContext } from "../../context/LyricsContext"
import { useEffect, useState } from "react"
import lyrics from "../../data/lyrics"
import ResultModal from "../../components/ResultModal/ResultModal"
import { createPortal } from "react-dom"
import useLyrics from "../../hooks/useLyrics"

function Casual() {
  const [currentLyric, setCurrentLyric] = useState("")
  // const [correctAnswers, setCorrectAnswers] = useState(0)
  // const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const [noAvailableLyrics, setNoAvailableLyrics] = useState(false)
  const [modalIsShown, setModalIsShown] = useState(false)

  const { usedLyrics, setUsedLyrics } = useLyrics()

  function handleMemoryClear() {
    localStorage.clear()
    setNoAvailableLyrics(false)
    handleInitialLoad()
  }

  function handleInitialLoad() {
    const usedLyricsLS = JSON.parse(localStorage.getItem("usedLyrics"))
    const currentLyricLS = JSON.parse(localStorage.getItem("currentLyric"))

    if (usedLyricsLS?.includes(currentLyricLS.lyric)) {
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
    }
  }

  function handleAnswerSelect(answer, currentLyric) {
    updateLS(currentLyric)
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
          <div className="scoreboard">Correct: 0 Incorrect: 0</div>
          {/* <ResultModal /> */}
          {modalIsShown
            ? createPortal(
                <ResultModal
                  currentLyric={currentLyric}
                  setCurrentLyric={setCurrentLyric}
                  setModalIsShown={setModalIsShown}
                  setNoAvailableLyrics={setNoAvailableLyrics}
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
          <div className="scoreboard">Correct: 0 Incorrect: 0</div>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default Casual
