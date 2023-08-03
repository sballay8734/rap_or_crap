import { useContext } from "react"
import { LyricsContext } from "../context/LyricsContext"

function useLyrics() {
  return useContext(LyricsContext)
}

export default useLyrics
