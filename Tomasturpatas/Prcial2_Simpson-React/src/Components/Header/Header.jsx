import { getImageUrl } from "../../config"
import "./Header.css"

function Header() {
  return (
    <header className="site-header">
      {/* Nubes decorativas del cielo de Springfield. */}
      <div className="header-cloud cloud-one" aria-hidden="true" />
      <div className="header-cloud cloud-two" aria-hidden="true" />
      <div className="header-cloud cloud-three" aria-hidden="true" />
      <div className="header-content">
        <img src={getImageUrl(1)} alt="Homer Simpson" />
        <div className="site-header-title">
          <p>Bienvenido a Springfield</p>
          <h1>Los Simpson</h1>
        </div>
        <img src={getImageUrl(3)} alt="Bart Simpson" />
      </div>
    </header>
  )
}

export default Header
