import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <img className="header-logo" src="/simpsons-logo.svg" alt="The Simpsons" width="1920" height="1080" />
        <p className="header-subtitle">By Cristhian Sarria</p>
      </div>
    </header>
  )
}

export default Header
