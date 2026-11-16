import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import { DEFAULT_APIS } from "./config"
import Browser from "./Components/Browser/Browser"
import Header from "./Components/Header/Header"
import Main from "./Components/Main/Main"
import CardDetail from "./Components/CardDetail/CardDetail"
import NotFound from "./Components/NotFound/NotFound"

function App() {
  const [apis, setApis] = useState(DEFAULT_APIS)
  const [apiUrl, setApiUrl] = useState(DEFAULT_APIS[0])

  const agregarApi = (url) => {
    if (!apis.includes(url)) {
      setApis((lista) => [...lista, url])
    }
    setApiUrl(url)
  }

  return (
    <div className="app">
      <Header />
      <Browser
        apis={apis}
        urlActual={apiUrl}
        onSelect={setApiUrl}
        onAdd={agregarApi}
      />

      <Routes>
        <Route path="/" element={<Main apiUrl={apiUrl} />} />
        <Route path="/personaje/:id" element={<CardDetail apiUrl={apiUrl} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="footer">Un paseo por Springfield · Hecho con React</footer>
    </div>
  )
}

export default App
