import { useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import LoginModal from './components/LoginModal.jsx'
import ProductCard from './components/ProductCard.jsx'
import ProductDetailModal from './components/ProductDetailModal.jsx'
import { products, categories } from './data/products.js'
import './styles/marketplace.css'

function App() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [textScale, setTextScale] = useState(1)
  const [highContrast, setHighContrast] = useState(false)

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('es')

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'Todos' || product.category === activeCategory
      const searchableText =
        `${product.title} ${product.description} ${product.category} ${product.location}`.toLocaleLowerCase('es')

      return matchesCategory && searchableText.includes(normalizedQuery)
    })
  }, [activeCategory, query])

  const handleLogin = () => {
    setIsLoggedIn(true)
    setIsLoginOpen(false)
  }

  return (
    <div
      className={`marketplace${highContrast ? ' marketplace--contrast' : ''}`}
      style={{ '--text-scale': textScale }}
    >
      <Header
        query={query}
        onQueryChange={setQuery}
        onLogin={() => setIsLoginOpen(true)}
        onLogout={() => setIsLoggedIn(false)}
        isLoggedIn={isLoggedIn}
        onTextScaleChange={setTextScale}
        onContrastChange={() => setHighContrast((current) => !current)}
        highContrast={highContrast}
      />

      <main>
        <section className="hero container">
          <div className="hero__copy">
            <span className="eyebrow">
              <i className="bi bi-stars" aria-hidden="true" />
              Compra y vende en tu comunidad
            </span>
            <h1>Lo que buscas, está más cerca.</h1>
            <p>
              Encuentra tesoros de segunda mano y dale una nueva vida a lo que
              ya no usas.
            </p>
            <a className="btn hero__button" href="#publicaciones">
              Explorar publicaciones
              <i className="bi bi-arrow-down-right" aria-hidden="true" />
            </a>
            <div className="hero__social-proof">
              <div className="avatar-stack" aria-hidden="true">
                <span>V</span>
                <span>M</span>
                <span>A</span>
              </div>
              <span>Una comunidad que comparte más</span>
            </div>
          </div>
          <div className="hero__art" aria-label="Espacio de trabajo compartido">
            <div className="hero__image" role="img" aria-label="Libros, plantas y audífonos" />
            <div className="floating-note floating-note--top">
              <span className="floating-note__icon">
                <i className="bi bi-recycle" aria-hidden="true" />
              </span>
              <span>
                <strong>Compra consciente</strong>
                <small>Tu próximo hallazgo te espera</small>
              </span>
            </div>
            <span className="hero__sparkle hero__sparkle--one">✳</span>
            <span className="hero__sparkle hero__sparkle--two">✦</span>
          </div>
          <div className="hero__shape" aria-hidden="true" />
        </section>

        <section className="market container" id="publicaciones">
          <div className="market__heading">
            <div>
              <span className="eyebrow">Hecho para encontrar</span>
              <h2>Publicaciones recientes</h2>
              <p>Artículos únicos, publicados por personas como tú.</p>
            </div>
          </div>

          <nav className="category-list" aria-label="Filtrar por categoría">
            {categories.map((category) => (
              <button
                className={`category-chip${activeCategory === category ? ' category-chip--active' : ''}`}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
                aria-pressed={activeCategory === category}
              >
                {category === 'Todos' && (
                  <i className="bi bi-grid" aria-hidden="true" />
                )}
                {category}
              </button>
            ))}
          </nav>

          <div className="market__results" aria-live="polite">
            {visibleProducts.length}{' '}
            {visibleProducts.length === 1 ? 'artículo disponible' : 'artículos disponibles'}
            {query && <span> para “{query}”</span>}
          </div>

          {visibleProducts.length > 0 ? (
            <div className="row g-4 product-grid">
              {visibleProducts.map((product) => (
                <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={product.id}>
                  <ProductCard
                    product={product}
                    onOpen={() => setSelectedProduct(product)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <i className="bi bi-search" aria-hidden="true" />
              <h3>No encontramos publicaciones</h3>
              <p>Prueba con otra búsqueda o elige una categoría distinta.</p>
              <button
                className="btn btn-outline-secondary"
                onClick={() => {
                  setQuery('')
                  setActiveCategory('Todos')
                }}
                type="button"
              >
                Ver todas las publicaciones
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <a className="brand brand--footer" href="#" aria-label="Campus Market, inicio">
            <span className="brand__mark"><i className="bi bi-bag-heart-fill" aria-hidden="true" /></span>
            <span>campus<span className="brand__accent">market</span></span>
          </a>
          <p>Un buen hallazgo siempre encuentra a alguien.</p>
          <span>© 2026 Campus Market</span>
        </div>
      </footer>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      {isLoginOpen && (
        <LoginModal onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App
