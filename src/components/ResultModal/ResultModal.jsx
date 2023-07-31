/* eslint-disable react/prop-types */
import "./result-modal.scss"

function ResultModal({ currentLyric, result, setModalIsShown }) {
  function closeModal() {
    setModalIsShown(false)
  }

  return (
    <div className="modal">
      <div className="opacity-layer"></div>
      <div className="modal-content">
        {currentLyric.lyric} {result}
        <button onClick={() => closeModal()}>Next Lyric</button>
      </div>
    </div>
  )
}

export default ResultModal
