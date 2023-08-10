/* eslint-disable react/prop-types */
import "./hardcore-modal.scss"

function HardcoreModal({ lyric, players, closeModal, setClearAnswers }) {
  function handleNextClick() {
    closeModal()
    setClearAnswers(false)
  }
  return (
    <div className="hardcore-modal">
      <div className="hardcore-opacity-layer"></div>
      <div className="hardcore-content-layer">
        <button onClick={handleNextClick} className="next-lyric">
          Next
        </button>
        {lyric.lyric}
        {players[0].name}
      </div>
    </div>
  )
}

export default HardcoreModal
