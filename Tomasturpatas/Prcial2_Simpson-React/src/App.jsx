import { Route, Routes } from "react-router-dom"
import "./App.css"
import Header from "./Components/Header/Header"
import Main from "./Components/Main/Main"
import Footer from "./Components/Footer/Footer"

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/*" element={<Main />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
