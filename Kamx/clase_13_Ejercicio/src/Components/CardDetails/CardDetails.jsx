import './CardDetails.css'

// Recibimos por props los datos que CharacterDetails obtiene de la API según la URL.
function CardDetails({ image, fullName, title, family }) {
  const nombre = fullName || 'Nombre desconocido'

  return (
    <article className="card-details">
      {/* La imagen ocupa un lateral en escritorio y la parte superior en móvil. */}
      <div className="card-details__portrait">
        {image ? (
          <img src={image} alt={nombre} loading="lazy" />
        ) : (
          <span className="card-details__placeholder">Imagen no disponible</span>
        )}
        <span className="card-details__badge">Game of Thrones</span>
      </div>

      {/* Usamos una lista de descripción para relacionar cada etiqueta con su dato. */}
      <div className="card-details__content">
        <p className="card-details__eyebrow">Personajes de los Siete Reinos</p>
        <h2 className="card-details__name">{nombre}</h2>
        <div className="card-details__divider" aria-hidden="true" />
        <dl className="card-details__info">
          <div>
            <dt>Título</dt>
            <dd>{title || 'Título desconocido'}</dd>
          </div>
          <div>
            <dt>Familia / Casa</dt>
            <dd>{family || 'Familia desconocida'}</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}

export default CardDetails
