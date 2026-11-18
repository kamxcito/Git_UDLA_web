import { useEffect, useState } from 'react'
import Card from '../Card/Card.jsx'
import './Main.css'

function Main() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Cancelamos la petición si salimos del listado antes de que termine.
    const controller = new AbortController()

    async function loadCharacters() {
      try {
        const response = await fetch('https://thesimpsonsapi.com/api/characters', {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error('No se pudieron cargar los personajes.')

        const data = await response.json()
        // El listado está dentro de results, no en la raíz del JSON.
        if (!Array.isArray(data.results)) throw new Error('La API devolvió un listado inesperado.')
        setCharacters(data.results)
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(`${error.message} Revisa tu conexión e inténtalo de nuevo.`)
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadCharacters()
    return () => controller.abort()
  }, [])

  return (
    <main className="characters-main">
      <h1>Personajes de Springfield</h1>
      <p className="main-intro">Dale clic a &quot;conocer más&quot; para detalles</p>

      {loading && <p className="list-message" role="status">Cargando personajes...</p>}
      {!loading && error && <p className="list-message" role="alert">{error}</p>}
      {!loading && !error && (
        <>
          {characters.length === 0 && <p>No hay personajes disponibles.</p>}
          <div className="characters-grid">
            {characters.map(character => <Card key={character.id} character={character} />)}
          </div>
        </>
      )}
    </main>
  )
}

export default Main
