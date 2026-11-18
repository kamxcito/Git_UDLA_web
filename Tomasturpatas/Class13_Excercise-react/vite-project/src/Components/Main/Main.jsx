import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CardCharacter from '../CardCharacter/CardCharacter'
import CardDetail from '../CardDetail/CardDetail'
import './Main.css'

const CHARACTERS_URL = 'https://thronesapi.com/api/v2/Characters'

function Main() {
  const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const { id: selectedCharacterId } = useParams()
  const navigate = useNavigate()
  const closeDetail = useCallback(() => navigate('/'), [navigate])

  function selectCharacter(id) {
    if (selectedCharacterId === String(id)) {
      navigate('/')
    } else {
      navigate(`/character/${id}`)
    }
  }

  useEffect(() => {
    async function loadCharacters() {
      try {
        const response = await fetch(CHARACTERS_URL)

        if (!response.ok) {
          throw new Error(`La solicitud terminó con el estado ${response.status}.`)
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          throw new Error('La respuesta de personajes no tiene el formato esperado.')
        }

        setCharacters(data)
      } catch {
        setError('No fue posible cargar los personajes. Inténtalo más tarde.')
      } finally {
        setIsLoading(false)
      }
    }

    loadCharacters()
  }, [])

  return (
    <main className="characters-page">
      <section className="characters-section" aria-labelledby="characters-title">
        <div className="section-heading">
          <p className="eyebrow">El mundo de Westeros</p>
          <h1 id="characters-title">Personajes de Game of Thrones</h1>
          <p>Conoce a las casas y personajes que luchan por el Trono de Hierro.</p>
        </div>

        {isLoading && <p className="request-message" role="status">Cargando personajes...</p>}
        {error && <p className="request-message request-error" role="alert">{error}</p>}

        {!isLoading && !error && characters.length === 0 && (
          <p className="request-message" role="status">No hay personajes disponibles.</p>
        )}

        {!isLoading && !error && characters.length > 0 && (
          <>
            <div className="characters-grid">
              {characters.map((character) => (
                <CardCharacter
                  key={character.id}
                  character={character}
                  isExpanded={selectedCharacterId === String(character.id)}
                  onSelect={() => selectCharacter(character.id)}
                />
              ))}
            </div>
            {selectedCharacterId !== undefined && (
              <CardDetail
                key={selectedCharacterId}
                characterId={Number(selectedCharacterId)}
                characterUrl={`${CHARACTERS_URL}/${selectedCharacterId}`}
                onClose={closeDetail}
              />
            )}
          </>
        )}
      </section>
    </main>
  )
}

export default Main