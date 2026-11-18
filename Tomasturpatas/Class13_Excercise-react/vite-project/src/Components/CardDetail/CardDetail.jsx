import { useEffect, useRef, useState } from 'react'
import './CardDetal.css'

function CardDetail({ characterId, characterUrl, onClose }) {
  const [character, setCharacter] = useState(null)
  const [error, setError] = useState('')
  const closeButtonRef = useRef(null)

  useEffect(() => {
    const controller = new AbortController()
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', closeOnEscape)

    async function loadCharacter() {
      try {
        const response = await fetch(characterUrl, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`La solicitud terminó con el estado ${response.status}.`)
        }

        const data = await response.json()

        if (data.id !== characterId) {
          throw new Error('La respuesta no corresponde al personaje seleccionado.')
        }

        setCharacter(data)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError('No fue posible cargar el detalle de este personaje.')
        }
      }
    }

    loadCharacter()

    return () => {
      controller.abort()
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
      previousFocus?.focus()
    }
  }, [characterId, characterUrl, onClose])

  return (
    <div
      className="detail-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <section
        className="detail-card"
        id={`character-detail-${characterId}`}
        role="dialog"
        aria-modal="true"
        aria-label={character ? undefined : 'Detalle del personaje'}
        aria-labelledby={character ? 'detail-card-name' : undefined}
        aria-describedby={character ? 'detail-card-description' : undefined}
      >
        <button
          ref={closeButtonRef}
          className="detail-card__close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar detalle"
        >
          ×
        </button>
        {character?.imageUrl && (
          <img
            className="detail-card__image"
            src={character.imageUrl}
            alt={`Retrato de ${character.fullName}`}
          />
        )}
        <div className="detail-card__content">
          {error ? (
            <p className="detail-card-message" role="alert">{error}</p>
          ) : !character ? (
            <p className="detail-card-message" role="status">Cargando detalle del personaje...</p>
          ) : (
            <>
              <p className="detail-card__eyebrow">Los Siete Reinos</p>
              <h2 id="detail-card-name">{character.fullName}</h2>
              <p className="detail-card__family">{character.family}</p>
              <div className="detail-card__rule" />
              <p className="detail-card__title">
                <span>Título</span>
                {character.title}
              </p>
              <p className="detail-card__description" id="detail-card-description">
                Su vínculo con {character.family} y el título «{character.title}» resumen su lugar
                en la historia de Westeros.
              </p>
              <a className="detail-card__link" href={characterUrl} target="_blank" rel="noreferrer">
                Ver datos en ThronesAPI
              </a>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default CardDetail
