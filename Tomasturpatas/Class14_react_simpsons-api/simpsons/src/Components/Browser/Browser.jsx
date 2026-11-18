import { useState } from 'react'
import "./Browser.css"

// El Browser NO hace fetch: recibe las URLs por props y avisa al padre (Main) qué URL se eligió
const Browser = (props) => {
  const { apis, urlActual, onSelect, onAdd } = props

  const [nuevaUrl, setNuevaUrl] = useState("")
  const [mensaje, setMensaje] = useState("")

  const handleAdd = () => {
    try {
      new URL(nuevaUrl) // lanza error si no es una URL válida
      onAdd(nuevaUrl)
      setNuevaUrl("")
      setMensaje("")
    } catch {
      setMensaje("Escribe una URL válida (https://...)")
    }
  }

  return (
    <section id="browser">
        <label htmlFor="apiSelect">API:</label>
        <select id="apiSelect" value={urlActual} onChange={(e) => onSelect(e.target.value)}>
            {
                apis.map(url => (
                    <option key={url} value={url}>{url}</option>
                ))
            }
        </select>

        <input
            type="text"
            placeholder="Agregar otra URL de API"
            value={nuevaUrl}
            onChange={(e) => setNuevaUrl(e.target.value)}
        />
        <button onClick={handleAdd}>Agregar</button>
        {mensaje && <p id="browser-mensaje">{mensaje}</p>}
    </section>
  )
}

export default Browser
