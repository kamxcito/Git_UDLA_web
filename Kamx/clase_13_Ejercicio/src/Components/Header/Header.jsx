// Importamos los estilos del encabezado y el componente del menú.
import './Header.css'
import Menu from '../Menu/Menu.jsx'

// El encabezado reúne el título de la página y sus enlaces de navegación.
function Header() {
  return (
    <header className="header">
      {/* El código de la imagen está comentado, por eso el logo no se muestra. */}
      {/* <img id='logo_header' src="https://1000marcas.net/wp-content/uploads/2020/11/Game-of-Thrones-logo.jpg" alt="imagen logo" /> */}
      <h1>Game of Thrones</h1>
      {/* Insertamos aquí el menú definido en Menu.jsx. */}
      <Menu />
    </header>
  )
}

export default Header
