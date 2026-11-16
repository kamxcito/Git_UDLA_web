function Header({
  query,
  onQueryChange,
  onLogin,
  onLogout,
  isLoggedIn,
  onTextScaleChange,
  onContrastChange,
  highContrast,
}) {
  return (
    <header className="site-header">
      <div className="container site-header__top">
        <a className="brand" href="#" aria-label="Campus Market, inicio">
          <span className="brand__mark">
            <i className="bi bi-bag-heart-fill" aria-hidden="true" />
          </span>
          <span>campus<span className="brand__accent">market</span></span>
        </a>

        <form className="search-bar" role="search" onSubmit={(event) => event.preventDefault()}>
          <label className="visually-hidden" htmlFor="market-search">
            Buscar publicaciones
          </label>
          <i className="bi bi-search search-bar__icon" aria-hidden="true" />
          <input
            id="market-search"
            type="search"
            placeholder="¿Qué estás buscando?"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </form>

        <div className="header-actions">
          <details className="header-menu">
            <summary className="header-action" aria-label="Abrir menú de cuenta">
              <i className="bi bi-person-circle" aria-hidden="true" />
              <span>Mi cuenta</span>
              <i className="bi bi-chevron-down header-action__chevron" aria-hidden="true" />
            </summary>
            <div className="menu-panel">
              <span className="menu-panel__eyebrow">
                {isLoggedIn ? '¡Qué bueno verte!' : 'Bienvenido a Campus Market'}
              </span>
              <button className="menu-panel__item" onClick={onLogin} type="button">
                <i className="bi bi-box-arrow-in-right" aria-hidden="true" />
                {isLoggedIn ? 'Mi perfil' : 'Iniciar sesión'}
              </button>
              <a className="menu-panel__item" href="#publicaciones">
                <i className="bi bi-compass" aria-hidden="true" />
                Navegar publicaciones
              </a>
              <button
                className="menu-panel__item menu-panel__item--muted"
                disabled={!isLoggedIn}
                onClick={onLogout}
                type="button"
              >
                <i className="bi bi-box-arrow-right" aria-hidden="true" />
                Salir de la cuenta
              </button>
            </div>
          </details>

          <details className="header-menu">
            <summary className="header-action header-action--accessibility" aria-label="Abrir menú de accesibilidad">
              <i className="bi bi-universal-access-circle" aria-hidden="true" />
              <span>Accesibilidad</span>
            </summary>
            <div className="menu-panel menu-panel--accessibility">
              <span className="menu-panel__eyebrow">Ajustes de lectura</span>
              <div className="accessibility-control">
                <span>Tamaño del texto</span>
                <div className="accessibility-control__buttons">
                  <button
                    aria-label="Reducir tamaño del texto"
                    onClick={() => onTextScaleChange((scale) => Math.max(0.9, scale - 0.1))}
                    type="button"
                  >
                    A−
                  </button>
                  <button
                    aria-label="Aumentar tamaño del texto"
                    onClick={() => onTextScaleChange((scale) => Math.min(1.2, scale + 0.1))}
                    type="button"
                  >
                    A+
                  </button>
                </div>
              </div>
              <button className="menu-panel__item" onClick={onContrastChange} type="button">
                <i className="bi bi-circle-half" aria-hidden="true" />
                {highContrast ? 'Desactivar alto contraste' : 'Activar alto contraste'}
              </button>
            </div>
          </details>
        </div>
      </div>

      <div className="site-header__bottom">
        <div className="container site-header__bottom-inner">
          <span><i className="bi bi-geo-alt" aria-hidden="true" /> Tu comunidad, tus hallazgos</span>
          <a href="#publicaciones">Explorar ahora <i className="bi bi-arrow-right" aria-hidden="true" /></a>
        </div>
      </div>
    </header>
  )
}

export default Header
