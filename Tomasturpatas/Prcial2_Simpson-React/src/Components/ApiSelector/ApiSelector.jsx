import { useState } from "react"
import "./ApiSelector.css"

function ApiSelector({ apis, urlActual, onSelect, onAdd }) {
  const [nuevaUrl, setNuevaUrl] = useState("")
  const [mensaje, setMensaje] = useState("")

  const agregarApi = (event) => {
    event.preventDefault()

    try {
      const url = new URL(nuevaUrl.trim())
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error("URL no válida")
      }

      onAdd(url.toString())
      setNuevaUrl("")
      setMensaje("")
    } catch {
      setMensaje("Escribe una URL válida que empiece con http:// o https://.")
    }
  }

  return (
    <section className="api-selector" aria-label="Selector de API">
      <div className="api-selector-field">
        <label htmlFor="api-select">API activa</label>
        <select
          id="api-select"
          value={urlActual}
          onChange={(event) => onSelect(event.target.value)}
        >
          {apis.map((url) => <option key={url} value={url}>{url}</option>)}
        </select>
      </div>

      <form className="api-selector-field" onSubmit={agregarApi}>
        <label htmlFor="api-new-url">Agregar otra API</label>
        <div className="api-selector-add">
          <input
            id="api-new-url"
            type="text"
            value={nuevaUrl}
            onChange={(event) => setNuevaUrl(event.target.value)}
            placeholder="https://ejemplo.com/api"
          />
          <button type="submit">Agregar</button>
        </div>
        {mensaje && <p className="api-selector-error" role="alert">{mensaje}</p>}
      </form>
    </section>
  )
}

export default ApiSelector
