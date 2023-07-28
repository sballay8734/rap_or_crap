import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.scss"
import { LyricsProvider } from "./context/LyricsContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LyricsProvider>
      <App />
    </LyricsProvider>
  </React.StrictMode>
)
