import "./CardDetail.css"
import { getImageUrl } from "../../config"

const CardDetail = ({ character, loading, error, onClose }) => {
  if (!character && !loading && !error) return null

  const generos = { Male: "Masculino", Female: "Femenino" }
  const estados = { Alive: "Vivo", Deceased: "Fallecido" }
  const phrases = Array.isArray(character?.phrases) ? character.phrases : []

  return (
    <div className="cardDetail-overlay" onClick={onClose}>
      <section
        className="cardDetail"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cardDetail-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="cardDetail-close" type="button" onClick={onClose} aria-label="Cerrar detalles">
          ×
        </button>

        {loading && <p className="cardDetail-message">Cargando detalles...</p>}
        {error && <p className="cardDetail-error">{error}</p>}

        {character && (
          <div className="cardDetail-content">
            <img src={getImageUrl(character.id)} alt={character.name || "Personaje de Los Simpson"} />
            <div className="cardDetail-information">
              <p className="cardDetail-eyebrow">Springfield · Archivo de personajes</p>
              <h2 id="cardDetail-title">{character.name || "Personaje sin nombre"}</h2>
              <div className="cardDetail-facts">
                <p><strong>Edad:</strong> {character.age ?? "Desconocida"}</p>
                <p><strong>Género:</strong> {generos[character.gender] || character.gender || "Desconocido"}</p>
                <p><strong>Estado:</strong> {estados[character.status] || character.status || "Desconocido"}</p>
                <p><strong>Ocupación:</strong> {character.occupation || "Desconocida"}</p>
              </div>
              <h3>Sobre el personaje</h3>
              <p className="cardDetail-description">
                {character.description || "No hay una descripción disponible para este personaje."}
              </p>
              {phrases.length > 0 && (
                <>
                  <h3>Frases</h3>
                  <ul className="cardDetail-phrases">
                    {phrases.map((phrase, index) => <li key={`${index}-${phrase}`}>«{phrase}»</li>)}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default CardDetail
