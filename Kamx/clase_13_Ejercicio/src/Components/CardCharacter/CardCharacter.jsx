// Cargamos los estilos de las tarjetas de personajes.
import './CardCharacter.css'
import { Link } from 'react-router'

// Recibimos del componente Main los datos (props) que mostrará cada tarjeta.
function CardCharacter({ id, name, image, title, family }) {
  return (
    <article className="card">
      {/* Mostramos la imagen; lazy permite retrasar su carga hasta que esté cerca de verse. */}
      <img src={image} alt={name} loading="lazy" />
      {/* Las llaves permiten mostrar los valores recibidos: nombre, título y familia. */}
      <h2>{name}</h2>
      <p>{title}</p>
      <p>{family}</p>
      {/* Link cambia la URL y muestra el detalle sin recargar toda la aplicación. */}
      <Link className="card__link" to={`/personajes/${id}`} aria-label={`Ver detalles de ${name}`}>
        Ver detalles
      </Link>
    </article>
  )
}

// Exportamos la tarjeta para poder reutilizarla desde otros componentes.
export default CardCharacter
