import { useState } from 'react'

function ProductCard({ product, onOpen }) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <article className="product-card">
      <div className="product-card__media">
        <button
          className="product-card__image-button"
          onClick={onOpen}
          type="button"
          aria-label={`Ver publicación: ${product.title}`}
        >
          <img src={product.image} alt={product.imageAlt} loading="lazy" />
        </button>
        <span className="product-card__category">{product.category}</span>
        <button
          className={`favorite-button${isFavorite ? ' favorite-button--active' : ''}`}
          onClick={() => setIsFavorite((current) => !current)}
          type="button"
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          aria-pressed={isFavorite}
        >
          <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`} aria-hidden="true" />
        </button>
      </div>
      <div className="product-card__body">
        <div className="product-card__title-row">
          <h3>{product.title}</h3>
          <span className="product-card__price">{product.price}</span>
        </div>
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__meta">
          <span><i className="bi bi-geo-alt" aria-hidden="true" /> {product.location}</span>
          <span>{product.publishedAt}</span>
        </div>
        <button className="product-card__view" onClick={onOpen} type="button">
          Ver publicación
          <i className="bi bi-arrow-up-right" aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}

export default ProductCard
