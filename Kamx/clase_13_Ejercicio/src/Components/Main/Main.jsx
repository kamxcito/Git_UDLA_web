// useState guarda datos que pueden cambiar y useEffect ejecuta la carga de personajes.
// También importamos los estilos y el componente que dibuja cada tarjeta.
import { useEffect, useState } from 'react'
import './Main.css'
import CardCharacter from '../CardCharacter/CardCharacter.jsx'

// Dirección de la API que nos entrega la lista de personajes de Game of Thrones.
const API_URL = 'https://thronesapi.com/api/v2/Characters'

function Main() {
  // Guardamos la lista, si la petición sigue cargando y un posible mensaje de error.
  // Cada función set... actualiza su estado y hace que React actualice lo que se muestra.
  const [personajes, setPersonajes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Este controlador permite cancelar la petición cuando el componente se retira de la página.
    const controller = new AbortController()

    // async y await permiten esperar la respuesta de la API dentro de esta función.
    async function cargarPersonajes() {
      try {
        // Pedimos los personajes y comprobamos que el servidor haya respondido correctamente.
        const respuesta = await fetch(API_URL, { signal: controller.signal })
        if (!respuesta.ok) throw new Error('No se pudieron cargar los personajes.')

        // Convertimos la respuesta JSON en datos de JavaScript y verificamos que sea una lista.
        const datos = await respuesta.json()
        if (!Array.isArray(datos)) throw new Error('La respuesta no es válida.')

        // Guardamos los personajes para poder mostrarlos en las tarjetas.
        setPersonajes(datos)
      } catch (error) {
        // Si ocurre un fallo, guardamos su mensaje. Una cancelación no se muestra como error.
        if (!controller.signal.aborted) setError(error.message)
      } finally {
        // Al terminar, quitamos el mensaje de carga si la petición no fue cancelada.
        if (!controller.signal.aborted) setCargando(false)
      }
    }

    // Iniciamos la carga y devolvemos la limpieza que cancela la petición al salir.
    cargarPersonajes()
    return () => controller.abort()
    // [] evita repetir el efecto por cambios de estado; StrictMode puede repetirlo en desarrollo.
  }, [])

  return (
    <main className="main">
      {/* Con && mostramos cada mensaje únicamente cuando su condición se cumple. */}
      {cargando && <p role="status">Cargando personajes...</p>}
      {error && <p role="alert">{error}</p>}
      {/* Mostramos el contenido cuando la carga termina y no hay errores. */}
      {!cargando && !error && (
        <>
          {/* Si la API devuelve una lista vacía, avisamos que no hay personajes. */}
          {personajes.length === 0 && <p>No hay personajes disponibles.</p>}
          <div className="cards">
            {/* map crea una tarjeta por personaje y le pasa sus datos como props.
                key permite a React identificar cada tarjeta cuando cambia la lista. */}
            {personajes.map(personaje => (
              <CardCharacter
                key={personaje.id}
                id={personaje.id}
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
