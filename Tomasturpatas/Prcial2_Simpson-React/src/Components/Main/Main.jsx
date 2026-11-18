import { useCallback, useEffect, useState } from "react"
import { useMatch, useNavigate } from "react-router-dom"
import { DEFAULT_APIS, getImageUrl } from "../../config"
import ApiSelector from "../ApiSelector/ApiSelector"
import CardCharacter from "../CardCharacter/CardCharacter"
import CardDetail from "../CardDetail/CardDetail"
import "./Main.css"

const EMPTY_INFO = { count: null, next: null, prev: null, pages: null }

function Main() {
  const [apis, setApis] = useState(DEFAULT_APIS)
  const [apiSeleccionada, setApiSeleccionada] = useState(DEFAULT_APIS[0])
  const [urlActual, setUrlActual] = useState(DEFAULT_APIS[0])
  const [personajes, setPersonajes] = useState([])
  const [info, setInfo] = useState(EMPTY_INFO)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")
  const personajeSeleccionado = useMatch("/character/:id")
  const navigate = useNavigate()
  const id = personajeSeleccionado?.params.id

  const cambiarUrl = (url) => {
    setCargando(true)
    setError("")
    setUrlActual(url)
  }

  const seleccionarApi = (url) => {
    setApiSeleccionada(url)
    cambiarUrl(url)
  }

  const agregarApi = (url) => {
    setApis((lista) => lista.includes(url) ? lista : [...lista, url])
    seleccionarApi(url)
  }

  const seleccionarPersonaje = (personaje) => {
    if (id === String(personaje.id)) {
      navigate("/")
    } else {
      navigate(`/character/${personaje.id}`)
    }
  }

  const cerrarDetalle = useCallback(() => navigate("/"), [navigate])

  useEffect(() => {
    let cancelado = false

    fetch(urlActual)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
        return response.json()
      })
      .then((data) => {
        if (!Array.isArray(data.results)) {
          throw new Error("La respuesta no contiene una lista de personajes.")
        }
        if (cancelado) return

        setPersonajes(data.results)
        setInfo({
          count: data.count ?? null,
          next: data.next || null,
          prev: data.prev || null,
          pages: data.pages ?? null,
        })
      })
      .catch((errorCarga) => {
        if (cancelado) return
        setPersonajes([])
        setInfo(EMPTY_INFO)
        setError(`No se pudieron cargar los personajes: ${errorCarga.message}`)
      })
      .finally(() => {
        if (!cancelado) setCargando(false)
      })

    // Ignora la respuesta anterior si se cambia de API o página.
    return () => {
      cancelado = true
    }
  }, [urlActual])

  const characterUrl = `${apiSeleccionada.replace(/\/+$/, "")}/${encodeURIComponent(id || "")}`
  const initialCharacter = personajes.find((personaje) => String(personaje.id) === id) || null

  return (
    <>
      {/* Dos decoraciones suaves al fondo, sin tapar el contenido. */}
      <div className="main-decorations" aria-hidden="true">
        <img className="background-homer" src={getImageUrl(1)} alt="" />
        <div className="background-donut">
          <span className="donut-sprinkle sprinkle-one" />
          <span className="donut-sprinkle sprinkle-two" />
          <span className="donut-sprinkle sprinkle-three" />
          <span className="donut-sprinkle sprinkle-four" />
        </div>
      </div>

      <ApiSelector
        apis={apis}
        urlActual={apiSeleccionada}
        onSelect={seleccionarApi}
        onAdd={agregarApi}
      />

      <main className="main-content">
        <div className="section-heading">
          <p className="section-label">Directorio de Springfield</p>
          <h2>Conoce a los personajes</h2>
        </div>

        {cargando && <p className="status-message" role="status">Cargando...</p>}
        {error && <p className="status-message error-message" role="alert">{error}</p>}
        {!cargando && !error && personajes.length === 0 && (
          <p className="status-message">No hay personajes para mostrar.</p>
        )}

        {typeof info.count === "number" && (
          <p className="total-characters">Total de resultados: {info.count}</p>
        )}

        {!cargando && !error && personajes.length > 0 && (
          <section className="character-grid" aria-label="Personajes de Los Simpson">
            {personajes.map((personaje) => (
              <CardCharacter
                key={personaje.id}
                character={personaje}
                onSelect={seleccionarPersonaje}
                isExpanded={id === String(personaje.id)}
              />
            ))}
          </section>
        )}

        <nav className="pagination" aria-label="Paginación">
          <button
            type="button"
            disabled={!info.prev || cargando}
            onClick={() => info.prev && cambiarUrl(info.prev)}
          >
            Anterior
          </button>
          <button
            type="button"
            disabled={!info.next || cargando}
            onClick={() => info.next && cambiarUrl(info.next)}
          >
            Siguiente
          </button>
        </nav>
      </main>

      {id && (
        <CardDetail
          key={id}
          characterId={id}
          characterUrl={characterUrl}
          initialCharacter={initialCharacter}
          onClose={cerrarDetalle}
        />
      )}
    </>
  )
}

export default Main
