import { useEffect, useState } from "react"
import CardCharacter from "../CardCharacter/CardCharacter"
import "./Main.css"

function Main({ apiUrl }) {
  const [personajes, setPersonajes] = useState([])
  const [pagina, setPagina] = useState(apiUrl)
  const [info, setInfo] = useState({ next: null, prev: null, count: null })
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    setPagina(apiUrl)
  }, [apiUrl])

  useEffect(() => {
    let cancelado = false

    const cargarPersonajes = async () => {
      setCargando(true)
      setError("")

      try {
        const respuesta = await fetch(pagina)
        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`)
        }

        const datos = await respuesta.json()
        if (!Array.isArray(datos.results)) {
          throw new Error("La respuesta de la API no contiene una lista de personajes.")
        }

        if (!cancelado) {
          setPersonajes(datos.results)
          setInfo({
            next: datos.next || null,
            prev: datos.prev || null,
            count: datos.count ?? null,
          })
        }
      } catch (errorCarga) {
        if (!cancelado) {
          setPersonajes([])
          setInfo({ next: null, prev: null, count: null })
          setError(`No se pudieron cargar los personajes. ${errorCarga.message}`)
        }
      } finally {
        if (!cancelado) setCargando(false)
      }
    }

    cargarPersonajes()
    return () => {
      cancelado = true
    }
  }, [pagina])

  return (
    <main className="main-content">
      <div className="section-heading">
        <p className="section-label">Directorio de Springfield</p>
        <h2>Conoce a los personajes</h2>
        {typeof info.count === "number" && (
          <p className="total-characters">{info.count} personajes en la API</p>
        )}
      </div>

      {cargando && <p className="status-message" role="status">Cargando personajes...</p>}
      {error && <p className="status-message error-message" role="alert">{error}</p>}

      {!cargando && !error && personajes.length === 0 && (
        <p className="status-message">No hay personajes para mostrar.</p>
      )}

      {!cargando && !error && personajes.length > 0 && (
        <section className="character-grid" aria-label="Lista de personajes">
          {personajes.map((personaje) => (
            <CardCharacter key={personaje.id} character={personaje} />
          ))}
        </section>
      )}

      <nav className="pagination" aria-label="Paginación">
        <button
          type="button"
          disabled={!info.prev || cargando}
          onClick={() => setPagina(info.prev)}
        >
          Página anterior
        </button>
        <button
          type="button"
          disabled={!info.next || cargando}
          onClick={() => setPagina(info.next)}
        >
          Página siguiente
        </button>
      </nav>
    </main>
  )
}

export default Main
