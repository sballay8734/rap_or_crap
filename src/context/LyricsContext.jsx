/* eslint-disable react/prop-types */
import { createContext } from "react"

const LyricsContext = createContext()

function LyricsProvider({ children }) {
  let usedLyrics = []

  return (
    <LyricsContext.Provider value={{ usedLyrics }}>
      {children}
    </LyricsContext.Provider>
  )
}

export { LyricsContext }
export { LyricsProvider }
