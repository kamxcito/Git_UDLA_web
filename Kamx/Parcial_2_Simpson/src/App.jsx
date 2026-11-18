import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Main from './components/Main/Main.jsx'
import CardDetail from './components/CardDetail/CardDetail.jsx'
import Footer from './components/Footer/Footer.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/character/:id" element={<CardDetail />} />
          <Route path="*" element={
            <main className="not-found">
              <h1>Página no encontrada</h1>
              <Link to="/">Volver al inicio</Link>
            </main>
          } />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
