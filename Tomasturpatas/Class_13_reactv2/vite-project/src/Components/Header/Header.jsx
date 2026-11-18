import logo from '../../assets/Logo_Naruto_Shippūden.webp'
import './Header.css'

const Header = () => {
  return (
    <header className="site-header">
      <a className="site-brand" href="/" aria-label="Ir al inicio">
        <img src={logo} alt="Naruto Shippuden" />
      </a>
      <p>Explora el mundo ninja y conoce a sus personajes</p>
    </header>
  )
}

export default Header