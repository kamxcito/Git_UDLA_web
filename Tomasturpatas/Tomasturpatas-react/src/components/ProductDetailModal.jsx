import Modal from './Modal.jsx'

function ProductDetailModal({ product, onClose }) {
  return (
    <Modal className="product-modal" onClose={onClose} title="Detalle de la publicación">
      <div className="product-detail">
        <img className="product-detail__image" src={product.image} alt={product.imageAlt} />
        <div className="product-detail__content">
          <span className="product-detail__category">{product.category}</span>
          <h3>{product.title}</h3>
          <span className="product-detail__price">{product.price}</span>
          <p>{product.description}</p>
          <div className="product-detail__facts">
            <span><i className="bi bi-geo-alt" aria-hidden="true" /> {product.location}</span>
            <span><i className="bi bi-person" aria-hidden="true" /> Publicado por {product.seller}</span>
            <span><i className="bi bi-clock" aria-hidden="true" /> {product.publishedAt}</span>
          </div>
          <button className="btn product-detail__button" onClick={onClose} type="button">
            Volver a las publicaciones
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ProductDetailModal
