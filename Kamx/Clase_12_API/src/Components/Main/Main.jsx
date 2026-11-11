import { useEffect, useState } from 'react'
import './Main.css'
import CardCharacter from '../CardCharacter/CardCharacter.jsx'

const API_URL = 'https://valorant-api.com/v1/agents?language=es-ES&isPlayableCharacter=true'

function Main() {
  const [agentes, setAgentes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    // Cancelar la petición evita actualizar el estado si el componente se desmonta.
    const controller = new AbortController()

    async function cargarAgentes() {
      setCargando(true)
      setError('')
      try {
        const respuesta = await fetch(API_URL, { signal: controller.signal })
        if (!respuesta.ok) throw new Error('No se pudo consultar la API.')
        const resultado = await respuesta.json()
        // Esta API devuelve los personajes en data, no en characters.
        if (resultado.status !== 200 || !Array.isArray(resultado.data)) {
          throw new Error('La API devolvió una respuesta inesperada.')
        }
        setAgentes(resultado.data
          .filter(agente => agente.isPlayableCharacter)
          .sort((a, b) => a.displayName.localeCompare(b.displayName)))
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(`${error.message} Revisa tu conexión e inténtalo de nuevo.`)
        }
      } finally {
        if (!controller.signal.aborted) setCargando(false)
      }
    }

    cargarAgentes()
    return () => controller.abort()
  }, [intento])

  return (
    <main className="agents-main" id="agentes">
      {cargando && <p className="status" role="status">Cargando agentes…</p>}
      {!cargando && error && (
        <div className="status" role="alert">
          <p>{error}</p>
          <button onClick={() => setIntento(valor => valor + 1)}>Reintentar</button>
        </div>
      )}
      {!cargando && !error && <>
        <p className="agent-count">{agentes.length} agentes disponibles</p>
        {agentes.length === 0 && <p className="status">No hay agentes disponibles.</p>}
        <div className="agents-grid">
          {agentes.map(agente => (
            <CardCharacter
              key={agente.uuid}
              name={agente.displayName}
              image={agente.fullPortrait || agente.displayIcon}
              role={agente.role?.displayName}
              description={agente.description}
            />
          ))}
        </div>
      </>}
    </main>
  )
}

export default Main
