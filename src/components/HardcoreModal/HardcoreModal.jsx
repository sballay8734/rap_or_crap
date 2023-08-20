/* eslint-disable react/prop-types */
import "./hardcore-modal.scss"
import useAnswers from "../../hooks/useAnswers"

function HardcoreModal({ lyric, players, closeModal, setClearAnswers }) {
  const { setPlayers } = useAnswers()
  function handleNextClick() {
    closeModal()
    setClearAnswers(false)

    let updatedPlayers = players.map((player) => {
      return { ...player, currentAnswer: null }
    })

    setPlayers(updatedPlayers)
    localStorage.setItem("players", JSON.stringify(updatedPlayers))
  }

  function handleResultsLogic(lyric) {
    if (lyric.rap) {
      return (
        <div className="is-rap">
          <p>
            <span className="is-rap-lyric">{lyric.lyric}</span>, is a sick bar
            written by {lyric.artist}
          </p>
          <p className="click-here">
            {`Don't believe us?`}
            <a
              className="lyric-link"
              href={lyric.link}
              target="_blank"
              rel="noreferrer"
            >
              Click here
            </a>
          </p>
        </div>
      )
    } else {
      return (
        <div className="is-crap">
          <p>{`That's crap brother`}</p>
        </div>
      )
    }
  }

  let playersCorrect = players.filter((p) => p.currentAnswer === lyric.rap)
  let playersIncorrect = players.filter((p) => p.currentAnswer !== lyric.rap)

  return (
    <div className="hardcore-modal">
      <div className="hardcore-opacity-layer"></div>
      <div className="hardcore-content-layer">
        <div className="results">
          <div className="safe">
            <div className="safe-header">SAFE</div>
            {playersCorrect.map((player) => {
              return <div key={player.name}>{player.name}</div>
            })}
          </div>
          <div className="drink">
            <div className="drink-header">DRINK</div>
            {playersIncorrect.map((player) => {
              return <div key={player.name}>{player.name}</div>
            })}
          </div>
        </div>
        {handleResultsLogic(lyric)}
        <button onClick={handleNextClick} className="next-lyric">
          Next Lyric
        </button>
      </div>
    </div>
  )
}

export default HardcoreModal
