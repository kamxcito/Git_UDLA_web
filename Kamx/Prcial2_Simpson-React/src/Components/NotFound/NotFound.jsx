import { Link } from "react-router-dom"
import "./NotFound.css"

function NotFound() {
  return (
    <main className="not-found">
      <p className="not-found-emoji" aria-hidden="true">🌤️</p>
      <h2>No encontrado</h2>
      <p>Esta calle no aparece en el mapa de Springfield.</p>
      <Link to="/">Volver al inicio</Link>
    </main>
  )
}

export default NotFound
