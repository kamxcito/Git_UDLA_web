// Cargamos los estilos de la lista de enlaces.
import './Menu.css'
import { Link } from 'react-router'

// Creamos el menú de navegación. aria-label ayuda a identificarlo con lectores de pantalla.
function Menu() {
  return (
    <nav aria-label="Menú principal">
      <ul className="menu">
        {/* Inicio vuelve a la lista con React Router. Hombres y Mujeres siguen pendientes de filtro. */}
        <li><Link to="/">Inicio</Link></li>
        <li><a href="#">Hombres</a></li>
        <li><a href="#">Mujeres</a></li>
      </ul>
    </nav>
  )
}

export default Menu
