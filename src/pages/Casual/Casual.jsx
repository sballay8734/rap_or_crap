import "./casual.scss"
// import { LyricsContext } from "../../context/LyricsContext"
import { useEffect, useState } from "react"
import lyrics from "../../data/lyrics"

function Casual() {
  const [currentLyric, setCurrentLyric] = useState("")
  // const [correctAnswers, setCorrectAnswers] = useState(0)
  // const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const [noAvailableLyrics, setNoAvailableLyrics] = useState(false)

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

  function handleAnswerSelect(currentLyric) {
    pushToLocaleStorage(currentLyric)
    // show result modal

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
      {currentLyric}
      <button onClick={() => handleAnswerSelect(currentLyric)}>Push</button>
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
