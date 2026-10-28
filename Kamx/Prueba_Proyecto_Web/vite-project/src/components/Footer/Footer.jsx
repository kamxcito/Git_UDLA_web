import "./Footer.css"


const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a className="brand footer-brand" href="#inicio" aria-label="Avocado, volver al inicio">
          <img src="/avocado.png" alt="" width="30" height="30" />
          <span>avocado<span className="brand-dot">.</span></span>
        </a>
        <p>Un pequeño espacio para lo natural.</p>
        <a className="back-to-top" href="#inicio">Volver arriba <span aria-hidden="true">↑</span></a>
      </div>
      <div className="container footer-bottom"><p>Hecho con curiosidad y React.</p><span>Proyecto de aprendizaje · Kamx</span></div>
    </footer>
  )
}

export default Footer
