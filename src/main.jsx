import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.scss"
import { LyricsProvider } from "./context/LyricsContext.jsx"
import { AnswerProvider } from "./context/AnswerContext.jsx"
import Div100vh from "react-div-100vh"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AnswerProvider>
      <LyricsProvider>
        <Div100vh>
          <App />
        </Div100vh>
      </LyricsProvider>
    </AnswerProvider>
  </React.StrictMode>
)
