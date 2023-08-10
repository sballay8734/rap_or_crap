import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.scss"
import { LyricsProvider } from "./context/LyricsContext.jsx"
import { AnswerProvider } from "./context/AnswerContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AnswerProvider>
      <LyricsProvider>
        <App />
      </LyricsProvider>
    </AnswerProvider>
  </React.StrictMode>
)
