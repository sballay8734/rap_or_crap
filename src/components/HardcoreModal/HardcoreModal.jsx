import "./hardcore-modal.scss"

function HardcoreModal({ lyric, players, closeModal }) {
  return (
    <div className="hardcore-modal">
      <div className="hardcore-opacity-layer"></div>
      <div className="hardcore-content-layer">
        <button onClick={closeModal} className="next-lyric">
          Next
        </button>
      </div>
    </div>
  )
}

export default HardcoreModal
