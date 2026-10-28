import "./Header.css"

const Header = () => {
  return (
    <header className="site-header" id="inicio">
      <div className="container header-inner">
        <a href="#inicio" className="brand" aria-label="Avocado, inicio">
          <img src="/avocado.png" alt="" width="38" height="38" />
          <span>avocado<span className="brand-dot">.</span></span>
        </a>
        <nav className="header-nav" aria-label="Navegación principal">
          <a href="#inicio">Inicio</a>
          <a href="#descubre">Descubre</a>
          <a href="#guia">Guía práctica</a>
        </nav>
        <a className="header-link" href="#descubre">Un poco más de verde <span aria-hidden="true">↗</span></a>
      </div>
    </header>
  )
}

export default Header
