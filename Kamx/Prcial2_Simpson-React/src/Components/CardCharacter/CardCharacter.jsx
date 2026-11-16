import { Link } from "react-router-dom"
import { getImageUrl } from "../../config"
import "./CardCharacter.css"

function CardCharacter({ character }) {
  const genero = { Male: "Masculino", Female: "Femenino" }
  const estado = { Alive: "Vivo", Deceased: "Fallecido" }

  return (
    <Link
      className="character-card"
      to={`/personaje/${character.id}`}
      aria-label={`Ver detalles de ${character.name || "personaje sin nombre"}`}
    >
      <img
        src={getImageUrl(character.id)}
        alt={character.name ? `Retrato de ${character.name}` : "Retrato de personaje"}
        loading="lazy"
      />
      <div className="character-card-content">
        <h3>{character.name || "Personaje sin nombre"}</h3>
        <p><strong>Edad:</strong> {character.age ?? "Desconocida"}</p>
        <p><strong>Género:</strong> {genero[character.gender] || character.gender || "Desconocido"}</p>
        <p><strong>Estado:</strong> {estado[character.status] || character.status || "Desconocido"}</p>
        <p><strong>Ocupación:</strong> {character.occupation || "Desconocida"}</p>
      </div>
    </Link>
  )
}

export default CardCharacter
