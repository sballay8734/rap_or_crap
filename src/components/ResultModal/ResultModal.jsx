/* eslint-disable react/prop-types */
import "./result-modal.scss"
import lyrics from "../../data/lyrics"
import useLyrics from "../../hooks/useLyrics"

function ResultModal({
  currentLyric,
  setCurrentLyric,
  setModalIsShown,
  setNoAvailableLyrics
}) {
  const { usedLyrics } = useLyrics()

  function closeModal() {
    let newLyrics = lyrics.filter((item) => !usedLyrics.includes(item.lyric))
    let newCurrentLyric =
      newLyrics[Math.floor(Math.random() * newLyrics.length)]

    if (newCurrentLyric === undefined) {
      setModalIsShown(false)
      setNoAvailableLyrics(true)
    } else {
      setCurrentLyric(newCurrentLyric)
      localStorage.setItem("currentLyric", JSON.stringify(newCurrentLyric))
      setModalIsShown(false)
    }
    // render next lyric
  }

  return (
    <div className="modal">
      <div className="opacity-layer"></div>
      <div className="modal-content">
        {currentLyric.lyric}
        <button onClick={closeModal}>Close / Next Lyric</button>
      </div>
    </div>
  )
}

export default ResultModal
