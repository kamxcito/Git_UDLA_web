import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar" aria-label="Navegación principal">
      <div className="navbar-content">
        <NavLink to="/" end>Inicio</NavLink>
      </div>
    </nav>
  )
}

export default Navbar
