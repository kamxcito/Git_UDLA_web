import { useState } from "react"
import "./Browser.css"

function Browser({ apis, urlActual, onSelect, onAdd }) {
  const [nuevaUrl, setNuevaUrl] = useState("")
  const [mensaje, setMensaje] = useState("")

  const agregarUrl = (event) => {
    event.preventDefault()

    try {
      const url = new URL(nuevaUrl.trim())
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error("Protocolo no válido")
      }

      onAdd(url.toString())
      setNuevaUrl("")
      setMensaje("")
    } catch {
      setMensaje("Escribe una URL válida que empiece con http:// o https://.")
    }
  }

  return (
    <section className="browser" aria-label="Selector de API">
      <div className="browser-select">
        <label htmlFor="api-select">API activa</label>
        <select
          id="api-select"
          value={urlActual}
          onChange={(event) => onSelect(event.target.value)}
        >
          {apis.map((url) => (
            <option key={url} value={url}>{url}</option>
          ))}
        </select>
      </div>

      <form className="browser-add" onSubmit={agregarUrl}>
        <label htmlFor="nueva-api">Agregar otra URL</label>
        <div className="browser-add-controls">
          <input
            id="nueva-api"
            type="url"
            placeholder="https://ejemplo.com/api"
            value={nuevaUrl}
            onChange={(event) => setNuevaUrl(event.target.value)}
          />
          <button type="submit">Agregar API</button>
        </div>
        {mensaje && <p className="browser-message" role="alert">{mensaje}</p>}
      </form>
    </section>
  )
}

export default Browser
