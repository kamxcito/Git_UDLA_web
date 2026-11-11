import './CardCharacter.css'

function CardCharacter({ name, image, role, description }) {
  return (
    <article className="agent-card">
      <div className="agent-image">
        {image && <img src={image} alt={name || 'Agente de Valorant'} loading="lazy" />}
      </div>
      <div className="agent-info">
        <p className="agent-role">{role || 'Sin rol'}</p>
        <h2>{name || 'Sin nombre'}</h2>
        <p className="agent-description">{description || 'Descripción no disponible.'}</p>
      </div>
    </article>
  )
}

export default CardCharacter
