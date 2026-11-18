import './header.css'

function Header() {
  return (
    <header className="site-header">
      <a className="site-brand" href="/" aria-label="Inicio de Game of Thrones">
        <span className="brand-mark" aria-hidden="true">GOT</span>
        <span>Game of Thrones</span>
      </a>
      <p>El destino de los Siete Reinos</p>
    </header>
  )
}

export default Header