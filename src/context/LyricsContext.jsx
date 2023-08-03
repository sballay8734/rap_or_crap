/* eslint-disable react/prop-types */
import { createContext, useState } from "react"

const LyricsContext = createContext()

function LyricsProvider({ children }) {
  const [usedLyrics, setUsedLyrics] = useState([])
  const [currentLyric, setCurrentLyric] = useState("")

  return (
    <LyricsContext.Provider
      value={{ usedLyrics, setUsedLyrics, currentLyric, setCurrentLyric }}
    >
      {children}
    </LyricsContext.Provider>
  )
}

export { LyricsContext }
export { LyricsProvider }
