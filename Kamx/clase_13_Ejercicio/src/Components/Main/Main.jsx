import { useEffect, useState } from 'react'
import './Main.css'
import CardCharacter from '../CardCharacter/CardCharacter.jsx'

const API_URL = 'https://thronesapi.com/api/v2/Characters'

function Main() {
  const [personajes, setPersonajes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function cargarPersonajes() {
      try {
        const respuesta = await fetch(API_URL, { signal: controller.signal })
        if (!respuesta.ok) throw new Error('No se pudieron cargar los personajes.')

        const datos = await respuesta.json()
        if (!Array.isArray(datos)) throw new Error('La respuesta no es válida.')

        setPersonajes(datos)
      } catch (error) {
        if (!controller.signal.aborted) setError(error.message)
      } finally {
        if (!controller.signal.aborted) setCargando(false)
      }
    }

    cargarPersonajes()
    return () => controller.abort()
  }, [])

  return (
    <main className="main">
      {cargando && <p role="status">Cargando personajes...</p>}
      {error && <p role="alert">{error}</p>}
      {!cargando && !error && (
        <>
          {personajes.length === 0 && <p>No hay personajes disponibles.</p>}
          <div className="cards">
            {personajes.map(personaje => (
              <CardCharacter
                key={personaje.id}
                name={personaje.fullName}
                image={personaje.imageUrl}
                title={personaje.title}
                family={personaje.family}
              />
            ))}
          </div>
        </>
      )}
    </main>
  )
}

export default Main
