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
        <>
          <p className="rap-header">{`RAP`}</p>
          <div className="is-rap">
            <p className="lyric-artist-wrapper">
              <span className="is-rap-lyric">
                {`"`}
                {lyric.lyric}
                {`" `}
              </span>
              <span className="artist-name">- {lyric.artist}</span>
            </p>
            <p className="click-here">
              <a
                className="lyric-link"
                href={lyric.link}
                target="_blank"
                rel="noreferrer"
              >
                {`Click here if you don't believe us!`}
              </a>
            </p>
          </div>
        </>
      )
    } else {
      return (
        <div className="is-crap">
          <p className="crap-header">{`CRAP`}</p>
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
        {handleResultsLogic(lyric)}
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
        <button onClick={handleNextClick} className="next-lyric">
          Next Lyric
        </button>
      </div>
    </div>
  )
}

export default HardcoreModal
