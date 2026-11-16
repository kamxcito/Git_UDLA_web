import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getImageUrl } from "../../config"
import "./CardDetail.css"

function CardDetail({ apiUrl }) {
  const { id } = useParams()
  const [personaje, setPersonaje] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let cancelado = false

    const cargarDetalle = async () => {
      setCargando(true)
      setError("")
      setPersonaje(null)

      try {
        const urlDetalle = `${apiUrl.replace(/\/+$/, "")}/${encodeURIComponent(id)}`
        const respuesta = await fetch(urlDetalle)
        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`)
        }

        const datos = await respuesta.json()
        if (!cancelado) setPersonaje(datos)
      } catch (errorCarga) {
        if (!cancelado) {
          setError(`No se pudo cargar el personaje. ${errorCarga.message}`)
        }
      } finally {
        if (!cancelado) setCargando(false)
      }
    }

    cargarDetalle()
    return () => {
      cancelado = true
    }
  }, [apiUrl, id])

  const genero = { Male: "Masculino", Female: "Femenino" }
  const estado = { Alive: "Vivo", Deceased: "Fallecido" }

  return (
    <main className="detail-page">
      <Link className="back-button" to="/">← Volver a la lista</Link>

      {cargando && <p className="detail-status" role="status">Cargando personaje...</p>}
      {error && <p className="detail-status detail-error" role="alert">{error}</p>}

      {!cargando && !error && personaje && (
        <article className="detail-card">
          <img
            className="detail-image"
            src={getImageUrl(personaje.id)}
            alt={personaje.name ? `Retrato de ${personaje.name}` : "Retrato de personaje"}
          />
          <div className="detail-information">
            <p className="detail-label">Expediente de Springfield · #{personaje.id}</p>
            <h2>{personaje.name || "Personaje sin nombre"}</h2>
            <dl className="detail-facts">
              <div><dt>Edad</dt><dd>{personaje.age ?? "Desconocida"}</dd></div>
              <div><dt>Género</dt><dd>{genero[personaje.gender] || personaje.gender || "Desconocido"}</dd></div>
              <div><dt>Estado</dt><dd>{estado[personaje.status] || personaje.status || "Desconocido"}</dd></div>
              <div><dt>Ocupación</dt><dd>{personaje.occupation || "Desconocida"}</dd></div>
              <div><dt>Fecha de nacimiento</dt><dd>{personaje.birthdate || "Desconocida"}</dd></div>
            </dl>

            {personaje.description && (
              <section className="detail-extra">
                <h3>Descripción</h3>
                <p>{personaje.description}</p>
              </section>
            )}

            {Array.isArray(personaje.phrases) && personaje.phrases.length > 0 && (
              <section className="detail-extra">
                <h3>Frases conocidas</h3>
                <ul>
                  {personaje.phrases.map((frase, index) => (
                    <li key={`${personaje.id}-${index}`}>«{frase}»</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </article>
      )}
    </main>
  )
}

export default CardDetail
