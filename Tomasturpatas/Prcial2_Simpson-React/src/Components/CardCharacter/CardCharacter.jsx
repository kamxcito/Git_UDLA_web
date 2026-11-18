import { getImageUrl } from "../../config"
import "./CardCharacter.css"

function CardCharacter({ character, onSelect, isExpanded }) {
  const generos = { Male: "Masculino", Female: "Femenino" }
  const estados = { Alive: "Vivo", Deceased: "Fallecido" }

  return (
    <button
      className="character-card"
      type="button"
      onClick={() => onSelect(character)}
      aria-expanded={isExpanded}
      aria-label={`${isExpanded ? "Ocultar detalles de" : "Ver detalles de"} ${character.name || "personaje"}`}
    >
      <img
        src={getImageUrl(character.id)}
        alt={character.name ? `Retrato de ${character.name}` : "Retrato de personaje"}
        loading="lazy"
      />
      <div className="character-card-content">
        <strong className="character-name">{character.name || "Sin nombre"}</strong>
        <div><strong>Edad:</strong> {character.age ?? "Desconocida"}</div>
        <div><strong>Género:</strong> {generos[character.gender] || character.gender || "Desconocido"}</div>
        <div><strong>Estado:</strong> {estados[character.status] || character.status || "Desconocido"}</div>
        <div><strong>Ocupación:</strong> {character.occupation || "Desconocida"}</div>
        <div className="character-action">{isExpanded ? "Ocultar detalles" : "Ver detalles"}</div>
      </div>
    </button>
  )
}

export default CardCharacter