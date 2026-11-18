import { useNavigate } from 'react-router-dom'
import './Card.css'

function Card({ character }) {
  const navigate = useNavigate()
  const imageUrl = `https://cdn.thesimpsonsapi.com/500/character/${character.id}.webp`

  const showDetail = () => {
    // La URL decide qué personaje mostrará CardDetail.
    navigate(`/character/${character.id}`)
  }

  return (
    <article className="character-card">
      <div className="card-portrait">
        <span className="card-id">#{String(character.id).padStart(2, '0')}</span>
        <img src={imageUrl} alt={character.name} loading="lazy" width="220" height="210" />
      </div>
      <div className="card-content">
        <h2>{character.name}</h2>
        <p>{character.occupation || 'Ocupación no disponible'}</p>
        <button type="button" onClick={showDetail} aria-label={`Conocer más sobre ${character.name}`}>
          Conocer más
        </button>
      </div>
    </article>
  )
}

export default Card
