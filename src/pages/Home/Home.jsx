import "./home.scss"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import useAnswers from "../../hooks/useAnswers"
import useLyrics from "../../hooks/useLyrics"

function Home() {
  const [carousel, setCarousel] = useState("rules")
  const { setPlayers } = useAnswers()
  const { setUsedLyrics } = useLyrics()

  const classNames = carousel

  const navigate = useNavigate()

  function handleGameStart(selectedMode) {
    navigate(selectedMode)
  }

  function renderSelection(carouselSelection) {
    if (carouselSelection === "rules") {
      return (
        <div className="selection rules-selection">These are the rules</div>
      )
    } else if (carouselSelection === "tips") {
      return <div>There are the tips</div>
    } else {
      return <div>There are the credits</div>
    }
  }

  useEffect(() => {
    // When LS is cleared, this makes it so that pressing "Start Game" starts over and prompts you to add players.
    // So you'll have to check if a game already exists and if so, give the user the option to continue, or start fresh with new players while ALSO giving them the option to clear usedLyrics from LS or not.
    setPlayers([])
    setUsedLyrics([])
  }, [])

  return (
    <div className="container">
      <div className="logo">Rap or Crap</div>
      {/*  */}
      <div className="home-wrapper">
        <div className="home-carousel">
          <div onClick={() => setCarousel("rules")} className="option rules">
            Rules
          </div>
          <div onClick={() => setCarousel("tips")} className="option tips">
            Tips
          </div>
          <div
            onClick={() => setCarousel("credits")}
            className="option credits"
          >
            Credits
          </div>
        </div>
        <div className="underline-wrapper">
          <div className={`underline ${classNames}`}></div>
        </div>
        <div className="text-wrapper">{renderSelection(carousel)}</div>
      </div>
      <div className="start-game">
        <button
          onClick={() => handleGameStart("hardcore")}
          className="start-button"
        >
          Start Game
        </button>
      </div>
    </div>
  )
}

export default Home
