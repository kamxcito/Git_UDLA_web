// Importamos los estilos y los componentes que forman la página.
import './App.css'
import Header from './Components/Header/Header.jsx'
import Main from './Components/Main/Main.jsx'
import Footer from './Components/Footer/Footer.jsx'
import { Link, Route, Routes } from 'react-router'
import CharacterDetails from './Components/CharacterDetails/CharacterDetails.jsx'

function App() {
  // Header y Footer siempre se muestran. Routes elige el contenido según la URL.
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        {/* :id es el identificador del personaje que queremos consultar. */}
        <Route path="/personajes/:id" element={<CharacterDetails />} />
        <Route path="*" element={
          <main className="main">
            <h2>Página no encontrada</h2>
            <Link to="/">Volver a los personajes</Link>
          </main>
        } />
      </Routes>
      <Footer />
    </>
  )
}

// Permite que main.jsx importe este componente para mostrar la aplicación.
export default App
