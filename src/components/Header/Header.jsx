import "./header.scss"
import { useNavigate } from "react-router"

function Header() {
  const navigate = useNavigate()

  function handleNewGameClick() {
    navigate("/")
  }

  return (
    <div className="header">
      <nav className="nav">
        <div className="logo">Rap or Crap</div>
        <ul className="nav-items">
          <li onClick={handleNewGameClick} className="nav-item">
            New Game
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header
