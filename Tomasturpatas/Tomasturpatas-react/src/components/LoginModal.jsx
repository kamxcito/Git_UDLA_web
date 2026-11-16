import Modal from './Modal.jsx'

function LoginModal({ onClose, onLogin }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin()
  }

  return (
    <Modal className="login-modal" onClose={onClose} title="Inicia sesión">
      <p className="login-modal__intro">
        Entra a tu comunidad para guardar tus hallazgos y publicar artículos.
      </p>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="login-email">Correo electrónico</label>
        <input
          autoComplete="email"
          id="login-email"
          name="email"
          placeholder="tu@correo.com"
          required
          type="email"
        />
        <label htmlFor="login-password">Contraseña</label>
        <input
          autoComplete="current-password"
          id="login-password"
          name="password"
          placeholder="Tu contraseña"
          required
          type="password"
        />
        <button className="btn login-form__submit" type="submit">
          Iniciar sesión
        </button>
      </form>
      <p className="login-modal__note">
        Demostración visual: tus datos no se envían ni se guardan.
      </p>
    </Modal>
  )
}

export default LoginModal
