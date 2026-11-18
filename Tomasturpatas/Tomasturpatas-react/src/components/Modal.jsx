import { useEffect } from 'react'

function Modal({ title, onClose, children, className = '' }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="market-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        aria-labelledby="market-modal-title"
        aria-modal="true"
        className={`market-modal ${className}`}
        role="dialog"
      >
        <div className="market-modal__heading">
          <h2 id="market-modal-title">{title}</h2>
          <button
            aria-label="Cerrar ventana"
            className="market-modal__close"
            onClick={onClose}
            type="button"
          >
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
        </div>
        {children}
      </section>
    </div>
  )
}

export default Modal
