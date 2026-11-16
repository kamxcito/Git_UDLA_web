import './Footer.css'

const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <footer className="site-footer">
      <p>© {currentYear} Mi contador React. Todos los derechos reservados.</p>
    </footer>
  )
}

export default Footer