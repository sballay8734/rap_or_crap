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
            <span className="number">1.</span>
            <span className="number-spacer"></span> After clicking{" "}
            {`"Start Game"`} enter the names of the players participating and
            click {`"Begin"`}.
          </li>
          {/* <div className="spacer"></div> */}
          <li className="rule rule-two">
            <span className="number">2.</span>
            <span className="number-spacer"></span> Have a single individual
            both read the lyric and input the answer on behalf of each player.
          </li>
          {/* <div className="spacer"></div> */}
          <li className="rule rule-three">
            <span className="number">3.</span>
            <span className="number-spacer"></span> For added fun, pass the
            device around and take turns reading the lyrics and inputting
            answers.
          </li>
          {/* <div className="spacer"></div> */}
          <li className="rule rule-four">
            <span className="number">4.</span>
            <span className="number-spacer"></span> Wrong answers drink.
          </li>
          {/* <div className="spacer"></div> */}
          <li className="rule rule-five">
            <span className="number">5.</span>
            <span className="number-spacer"></span>At the end of the game,
            everyone drinks for the amount of seconds equal to the number of
            questions they got wrong.
          </li>
        </ol>
      )
    } else if (carouselSelection === "tips") {
      return (
        <ol className="selection rules-selection">
          <li className="rule rule-one">
            <span className="number">1.</span>
            <span className="number-spacer"></span>If you KNOW the lyric is from
            a real song, keep it to yourself. Saying things like{" "}
            {`"Oh I know this song!", or "This is JAY-Z baby!"`} will give away
            the answer.
          </li>
          {/* <div className="spacer"></div> */}
          <li className="rule rule-two">
            <span className="number">2.</span>
            <span className="number-spacer"></span>Click on the YouTube links if
            you want proof that the lyric is real.
          </li>
          {/* <div className="spacer"></div> */}
          <li className="rule rule-three">
            <span className="number">3.</span>
            <span className="number-spacer"></span> Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </li>
          {/* <div className="spacer"></div> */}
          <li className="rule rule-four">
            <span className="number">4.</span>
            <span className="number-spacer"></span>Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </li>
          {/* <div className="spacer"></div> */}
          <li className="rule rule-five">
            <span className="number">5.</span>
            <span className="number-spacer"></span>Lorem ipsum dolor, sit amet
            consectetur adipisicing elit.
          </li>
        </ol>
      )
    } else {
      return (
        <div className="selection credits-selection">
          <p>
            Without the 2 hour drive to the Jersey Shore, most of these lyrics
            would never have come to life. Special thanks Lorem ipsum dolor sit,
            amet consectetur adipisicing elit. Laboriosam rerum enim amet animi!
            Sed cupiditate voluptas vitae sit consectetur hic quas nulla magnam,
            iusto iure dolor nobis aliquam quis vero!
            <br></br>
            <br></br>
            Without the 2 hour drive to the Jersey Shore, most of these lyrics
            would never have come to life. Special thanks Lorem ipsum dolor sit,
            amet consectetur adipisicing elit. Laboriosam rerum enim amet animi!
            Sed cupiditate voluptas vitae sit consectetur hic quas nulla magnam,
            iusto iure dolor nobis aliquam quis vero!
          </p>
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
      <div className="logo">
        <span className="logo-background"></span>Rap or Crap?
      </div>
      {/*  */}
      <div className="home-wrapper">
        <div className="home-carousel">
          <div
            onClick={() => setCarousel("tips")}
            className={`option tips ${carousel === "tips" ? "active" : ""}`}
          >
            Tips
          </div>
          <div
            onClick={() => setCarousel("rules")}
            className={`option rules ${carousel === "rules" ? "active" : ""}`}
          >
            Rules
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
