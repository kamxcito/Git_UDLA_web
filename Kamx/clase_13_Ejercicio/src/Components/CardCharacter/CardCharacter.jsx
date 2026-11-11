import './CardCharacter.css'

function CardCharacter({ name, image, title, family }) {
  return (
    <article className="card">
      <img src={image} alt={name} loading="lazy" />
      <h2>{name}</h2>
      <p>{title}</p>
      <p>{family}</p>
    </article>
  )
}

export default CardCharacter
