import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import CardDetails from '../CardDetails/CardDetails.jsx'

function CharacterDetails() {
  // Leemos el :id de la URL. Así el detalle también funciona al abrir un enlace directo.
  const { id } = useParams()
  const [resultado, setResultado] = useState({ id: null, personaje: null, error: '' })

  useEffect(() => {
    const controller = new AbortController()

    async function cargarDetalle() {
      try {
        if (!/^\d+$/.test(id)) throw new Error('Personaje no encontrado.')
        const respuesta = await fetch(`https://thronesapi.com/api/v2/Characters/${id}`, {
          signal: controller.signal,
        })
        if (!respuesta.ok) {
          throw new Error(respuesta.status === 404
            ? 'Personaje no encontrado.'
            : 'No se pudo cargar el personaje.')
        }
        const personaje = await respuesta.json()
        if (!personaje || String(personaje.id) !== id || !personaje.fullName) {
          throw new Error('Personaje no encontrado.')
        }
        if (!controller.signal.aborted) setResultado({ id, personaje, error: '' })
      } catch (error) {
        if (!controller.signal.aborted) setResultado({ id, personaje: null, error: error.message })
      }
    }

    cargarDetalle()
    // Cancelamos la petición al salir o cambiar de personaje.
    return () => controller.abort()
  }, [id])

  // Si cambia el id, ocultamos el resultado anterior mientras llega el nuevo.
  const cargando = resultado.id !== id
  const { personaje, error } = resultado

  return (
    <main className="main">
      <Link className="details-back" to="/"> Volver a los personajes</Link>
      {cargando ? <p role="status">Cargando personaje...</p> : error ? (
        <p role="alert">{error}</p>
      ) : (
        <CardDetails
          image={personaje.imageUrl}
          fullName={personaje.fullName}
          title={personaje.title}
          family={personaje.family}
        />
      )}
    </main>
  )
}

export default CharacterDetails
