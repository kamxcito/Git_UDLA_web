import { useState } from 'react'
import './Cardcharacter.css'

function CardCharacter({ character }) {
  const [hasImageError, setHasImageError] = useState(false)
  const image = character.images?.[0]
  const clan = character.personal?.clan
  const affiliations = character.personal?.affiliation
  const mangaDebut = character.debut?.manga?.replace(
    /\s+Chapter\s+#(\d+)/i,
    ', capítulo n.º $1',
  )

  return (
    <article className="character-card">
      {image && !hasImageError ? (
        <img
          className="character-image"
          src={image}
          alt={`Personaje: ${character.name}`}
          onError={() => setHasImageError(true)}
        />
      ) : (
        <div className="character-image character-image-placeholder" aria-hidden="true">
          Imagen no disponible
        </div>
      )}
      <div className="character-details">
        <h2>{character.name}</h2>
        {clan && <p><span>Clan</span>{clan}</p>}
        {Array.isArray(affiliations) && affiliations.length > 0 && (
          <p><span>Afiliación</span>{affiliations.slice(0, 2).join(', ')}</p>
        )}
        {mangaDebut && (
          <p><span>Primera aparición en el manga</span>{mangaDebut}</p>
        )}
      </div>
    </article>
  )
}

export default CardCharacter