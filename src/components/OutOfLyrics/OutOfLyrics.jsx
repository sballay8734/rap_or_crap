/* eslint-disable react/prop-types */
import "../../pages/Hardcore/hardcore.scss"
import "../MultiAnswerSelect/multi-answer.scss"
import MultiAnswerSelect from "../MultiAnswerSelect/MultiAnswerSelect"

function OutOfLyrics({ players }) {
  return (
    <div className="player-answers">
      <div className="out-of-lyrics-header">OUT OF LYRICS</div>
      {players.map((player) => {
        return (
          <MultiAnswerSelect
            key={player.name}
            player={player}
            showAnswerButtons={false}
          />
        )
      })}
    </div>
  )
}

export default OutOfLyrics
