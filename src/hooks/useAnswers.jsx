import { AnswerContext } from "../context/AnswerContext"
import { useContext } from "react"

function useAnswers() {
  return useContext(AnswerContext)
}

export default useAnswers
