import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './CardDetail.css'

function CardDetail() {
  // useParams lee el segmento :id de /character/:id como un string.
  const { id } = useParams()
  const navigate = useNavigate()
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    setCharacter(null)

    async function loadCharacter() {
      try {
        if (!/^[1-9]\d*$/.test(id)) throw new Error('El ID del personaje debe ser un número entero positivo.')

        // Cada ID de la URL produce una nueva consulta al endpoint de detalle.
        const response = await fetch(`https://thesimpsonsapi.com/api/characters/${id}`, {
          signal: controller.signal,
        })
        if (response.status === 404) throw new Error('No se encontró ese personaje.')
        if (!response.ok) throw new Error('No se pudo cargar el personaje. Inténtalo de nuevo.')

        const data = await response.json()
        if (!data.id || !data.name) throw new Error('La API devolvió un personaje inesperado.')
        setCharacter(data)
      } catch (error) {
        if (!controller.signal.aborted) setError(error.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadCharacter()
    return () => controller.abort()
  }, [id])

  return (
    <main className="character-detail">
      <button className="back-button" type="button" onClick={() => navigate(-1)}>
        Volver
      </button>

      {loading && <p role="status">Cargando personaje...</p>}
      {!loading && error && <p role="alert">{error}</p>}
      {!loading && !error && character && (
        <article className="detail-card">
          <div className="detail-portrait">
            <img
              src={`https://cdn.thesimpsonsapi.com/500/character/${character.id}.webp`}
              alt={character.name}
              width="400"
              height="450"
            />
          </div>
          <div className="detail-content">
            <p className="detail-label">PERSONAJE #{character.id}</p>
            <h1>{character.name}</h1>
            <dl className="detail-facts">
              <div><dt>Edad</dt><dd>{character.age != null ? `${character.age} ${character.age === 1 ? 'año' : 'años'}` : 'No disponible'}</dd></div>
              <div><dt>Género</dt><dd>{character.gender || 'No disponible'}</dd></div>
              <div><dt>Estado</dt><dd>{character.status || 'No disponible'}</dd></div>
              <div><dt>Nacimiento</dt><dd>{character.birthdate || 'No disponible'}</dd></div>
              <div className="detail-occupation"><dt>Ocupación</dt><dd>{character.occupation || 'No disponible'}</dd></div>
            </dl>
            {character.description && (
              <section>
                <h2>Sobre el personaje</h2>
                <p>{character.description}</p>
              </section>
            )}
            {character.phrases?.length > 0 && (
              <section className="detail-phrases">
                <h2>Algunas de sus frases</h2>
                <ul>{character.phrases.slice(0, 3).map((phrase, index) => <li key={index}>{phrase}</li>)}</ul>
              </section>
            )}
          </div>
        </article>
      )}
    </main>
  )
}

export default CardDetail
