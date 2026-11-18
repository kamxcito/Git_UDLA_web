// Importamos las herramientas de React y el componente principal de la aplicación.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'

// Buscamos el elemento HTML con id="root" y mostramos la aplicación dentro de él.
// StrictMode activa revisiones adicionales durante el desarrollo para detectar problemas.
createRoot(document.getElementById('root')).render(
  // BrowserRouter permite navegar entre la lista y los detalles sin recargar la página.
  <StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>,
)
