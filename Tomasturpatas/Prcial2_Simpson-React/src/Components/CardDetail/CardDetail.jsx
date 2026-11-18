import { useEffect, useState } from "react"
import { getImageUrl } from "../../config"
import "./CardDetail.css"

function CardDetail({ characterId, characterUrl, initialCharacter, onClose }) {
  const [personaje, setPersonaje] = useState(initialCharacter)
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    let cancelado = false

    fetch(characterUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
        return response.json()
      })
      .then((data) => {
        if (!cancelado) {
          setPersonaje({ ...initialCharacter, ...data })
        }
      })
      .catch((errorCarga) => {
        if (cancelado) return
        if (!initialCharacter) {
          setError(`No se pudo cargar el personaje: ${errorCarga.message}`)
        }
      })
      .finally(() => {
        if (!cancelado) setCargando(false)
      })

    const scrollAnterior = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const cerrarConEscape = (event) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", cerrarConEscape)

    return () => {
      cancelado = true
      document.body.style.overflow = scrollAnterior
      window.removeEventListener("keydown", cerrarConEscape)
    }
  }, [characterUrl, initialCharacter, onClose])

  const personajeVisible = personaje || initialCharacter
  const generos = { Male: "Masculino", Female: "Femenino" }
  const estados = { Alive: "Vivo", Deceased: "Fallecido" }
  const frases = Array.isArray(personajeVisible?.phrases)
    ? personajeVisible.phrases.slice(0, 5)
    : []

  return (
    <div
      className="detail-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className="detail-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
      >
        <button className="detail-close" type="button" onClick={onClose} aria-label="Cerrar detalles">
          ×
        </button>

        {cargando && <p className="detail-loading" role="status">Cargando datos completos...</p>}
        {error && <p className="detail-error" role="alert">{error}</p>}

        {personajeVisible && (
          <div className="detail-content">
            <img
              className="detail-image"
              src={getImageUrl(characterId)}
              alt={`Retrato de ${personajeVisible.name || "personaje"}`}
            />
            <div className="detail-information">
              <p className="detail-label">Personaje #{characterId}</p>
              <h2 id="detail-title">{personajeVisible.name || "Personaje sin nombre"}</h2>
              <p><strong>Ocupación:</strong> {personajeVisible.occupation || "Desconocida"}</p>
              <p><strong>Edad:</strong> {personajeVisible.age ?? "Desconocida"}</p>
              <p><strong>Nacimiento:</strong> {personajeVisible.birthdate || "Desconocido"}</p>
              <p><strong>Género:</strong> {generos[personajeVisible.gender] || personajeVisible.gender || "Desconocido"}</p>
              <p><strong>Estado:</strong> {estados[personajeVisible.status] || personajeVisible.status || "Desconocido"}</p>

              {frases.length > 0 && (
                <section className="detail-phrases">
                  <h3>Frases</h3>
                  <ul>
                    {frases.map((frase, index) => (
                      <li key={`${characterId}-${index}`}>«{frase}»</li>
                    ))}
                  </ul>
                </section>
              )}

              <a className="detail-api-link" href={characterUrl} target="_blank" rel="noreferrer">
                Ver datos en la API
              </a>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default CardDetail
