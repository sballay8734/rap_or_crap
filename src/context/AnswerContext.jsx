/* eslint-disable react/prop-types */
import { createContext } from "react"
import { useState } from "react"

const AnswerContext = createContext()

function AnswerProvider({ children }) {
  // Needs to be list of player objects
  const [players, setPlayers] = useState([])

  return (
    <AnswerContext.Provider value={{ players, setPlayers }}>
      {children}
    </AnswerContext.Provider>
  )
}

export { AnswerContext }
export { AnswerProvider }
