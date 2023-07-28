import "./App.scss"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header"
import Home from "./pages/Home/Home"
import Casual from "./pages/Casual/Casual"
import Hardcore from "./pages/Hardcore/Hardcore"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/casual" element={<Casual />} />
        <Route path="/hardcore" element={<Hardcore />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
