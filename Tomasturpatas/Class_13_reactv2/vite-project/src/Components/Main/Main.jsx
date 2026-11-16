import { useEffect, useState } from 'react'
import CardCharacter from '../CardCharacter/Cardcharacter'
import './Main.css'

const CHARACTERS_URL = 'https://dattebayo-api.onrender.com/characters?limit=20'

function Main() {
  const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadCharacters() {
      try {
        const response = await fetch(CHARACTERS_URL, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`La solicitud terminó con el estado ${response.status}.`)
        }

        const data = await response.json()

        if (!Array.isArray(data.characters)) {
          throw new Error('La respuesta de personajes no tiene el formato esperado.')
        }

        const narutoCharacters = data.characters.filter((character) => {
          const mangaDebut = character.debut?.manga ?? ''
          const mangaChapter = mangaDebut.match(/^Naruto Chapter #(\d+)$/i)

          return mangaChapter !== null && Number(mangaChapter[1]) < 700
        })

        setCharacters(narutoCharacters)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError('No fue posible cargar los personajes. Inténtalo de nuevo más tarde.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadCharacters()

    return () => controller.abort()
  }, [])

  return (
    <main className="characters-page">
      <section className="characters-section" aria-labelledby="characters-title">
        <div className="section-heading">
          <p className="eyebrow">Aldea Oculta entre las Hojas</p>
          <h1 id="characters-title">Personajes de Naruto</h1>
          <p>Descubre algunos de los ninjas que forman parte de esta historia.</p>
        </div>

        {isLoading && (
          <p className="request-message" role="status">
            Cargando personajes…
          </p>
        )}

        {error && (
          <p className="request-message request-error" role="alert">
            {error}
          </p>
        )}

        {!isLoading && !error && characters.length === 0 && (
          <p className="request-message" role="status">
            No hay personajes disponibles en este momento.
          </p>
        )}

        {!isLoading && !error && characters.length > 0 && (
          <div className="characters-grid">
            {characters.map((character) => (
              <CardCharacter key={character.id} character={character} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Main