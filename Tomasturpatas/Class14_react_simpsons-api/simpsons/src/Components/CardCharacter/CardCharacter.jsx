import React from 'react'
import "./CardCharacter.css"
import { getImageUrl } from '../../config'

const CardCharacter = ({ character, onOpen }) => {
    const { id, name, age, gender, occupation, status } = character

    const generos = { Male: "Masculino", Female: "Femenino" }
    const estados = { Alive: "Vivo", Deceased: "Fallecido" }

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            onOpen(character)
        }
    }

  return (
    <article
        id="cardCharacter"
        role="button"
        tabIndex={0}
        onClick={() => onOpen(character)}
        onKeyDown={handleKeyDown}
        aria-label={`Ver detalles de ${name || "personaje sin nombre"}`}
    >
        <h2>{name || "Sin nombre"}</h2>
        <img src={getImageUrl(id)} alt={name} />
        <p>Edad: {age ?? "Desconocida"}</p>
        <p>Género: {generos[gender] || gender || "Desconocido"}</p>
        <p>Estado: {estados[status] || status || "Desconocido"}</p>
        <p>Ocupación: {occupation || "Desconocida"}</p>
    </article>
  )
}

export default CardCharacter
