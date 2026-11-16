import "./Header.css"

function Header() {
  return (
    <header className="hero">
      <div className="hero-sun" aria-hidden="true" />
      <div className="cloud cloud-left" aria-hidden="true" />
      <div className="cloud cloud-right" aria-hidden="true" />
      <div className="hero-copy">
        <p className="hero-eyebrow">¡Bienvenido a Springfield!</p>
        <h1>Los Simpson</h1>
        <p>Explora tus personajes favoritos</p>
      </div>
    </header>
  )
}

export default Header
