import { useState } from 'react'
import './CardCharacter.css'

function CardCharacter({ character, onSelect, isExpanded }) {
  const [hasImageError, setHasImageError] = useState(false)

  return (
    <button
      className={`character-card${isExpanded ? ' character-card-expanded' : ''}`}
      type="button"
      onClick={onSelect}
      aria-expanded={isExpanded}
      aria-controls={isExpanded ? `character-detail-${character.id}` : undefined}
    >
      {character.imageUrl && !hasImageError ? (
        <img
          className="character-image"
          src={character.imageUrl}
          alt={`Personaje: ${character.fullName}`}
          onError={() => setHasImageError(true)}
        />
      ) : (
        <span className="character-image character-image-placeholder" aria-hidden="true">
          Sin imagen disponible
        </span>
      )}
      <span className="character-details">
        <span className="character-name">{character.fullName}</span>
        <span><span className="character-label">Título</span>{character.title}</span>
        <span><span className="character-label">Casa</span>{character.family}</span>
        <span className="character-open-hint">
          {isExpanded ? 'Ocultar detalles' : 'Ver detalles'}
        </span>
      </span>
    </button>
  )
}

export default CardCharacter