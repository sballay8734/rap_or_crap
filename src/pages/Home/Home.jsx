import "./home.scss"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import useAnswers from "../../hooks/useAnswers"
import useLyrics from "../../hooks/useLyrics"

function Home() {
  const [carousel, setCarousel] = useState("rules")
  const { setPlayers } = useAnswers()
  const { setUsedLyrics } = useLyrics()

  const navigate = useNavigate()

  function handleGameStart(selectedMode) {
    navigate(selectedMode)
  }

  function renderSelection(carouselSelection) {
    if (carouselSelection === "rules") {
      return (
        <ol className="selection rules-selection">
          <li className="rule rule-one">
            1. After clicking {`"Start Game"`} enter the names of the players
            participating and click {`"Begin"`}.
          </li>
          <div className="spacer"></div>
          <li className="rule rule-two">
            2. Have a single individual both read the lyric and input the answer
            on behalf of each player prior to submitting them.
          </li>
          <div className="spacer"></div>
          <li className="rule rule-three">
            3. For added fun, pass the device around and take turns reading the
            lyrics and inputting answers.
          </li>
          <div className="spacer"></div>
          <li className="rule rule-four">4. Wrong answers drink.</li>
          <div className="spacer"></div>
          <li className="rule rule-five">
            5. (Optional) At the end of the game, the winner chooses someone to
            drink for an amount of seconds equal to the number of questions they
            got right.
          </li>
        </ol>
      )
    } else if (carouselSelection === "tips") {
      return (
        <div className="selection">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio fugit
          ad corrupti voluptate repellat mollitia architecto numquam porro
          ducimus, corporis sint vitae velit animi molestiae qui. Exercitationem
          perspiciatis praesentium sequi.
        </div>
      )
    } else {
      return (
        <div className="selection">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi
          similique vero debitis praesentium adipisci quia aut accusamus quis
          quae modi, illo, natus facilis consequuntur velit, voluptatum
          reiciendis sit corporis ab!
        </div>
      )
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
      <div className="logo">Rap or Crap?</div>
      {/*  */}
      <div className="home-wrapper">
        <div className="home-carousel">
          <div
            onClick={() => setCarousel("rules")}
            className={`option rules ${carousel === "rules" ? "active" : ""}`}
          >
            Rules
          </div>
          <div
            onClick={() => setCarousel("tips")}
            className={`option tips ${carousel === "tips" ? "active" : ""}`}
          >
            Tips
          </div>
          <div
            onClick={() => setCarousel("credits")}
            className={`option credits ${
              carousel === "credits" ? "active" : ""
            }`}
          >
            Credits
          </div>
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
