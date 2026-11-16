import { useState, useEffect } from 'react'
import "./Main.css"
import Browser from '../Browser/Browser'
import CardCharacter from '../CardCharacter/CardCharacter'
import CardDetail from '../CardDetail/CardDetail'
import { DEFAULT_APIS } from '../../config'

const Main = () => {

  const [apis, setApis] = useState(DEFAULT_APIS)
  const [urlActual, setUrlActual] = useState(DEFAULT_APIS[0])
  const [personajes, setPersonajes] = useState([])
  const [info, setInfo] = useState({})
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(
    () => new URLSearchParams(window.location.search).get("character")
  )
  const [detalle, setDetalle] = useState(null)
  const [cargandoDetalle, setCargandoDetalle] = useState(
    () => Boolean(new URLSearchParams(window.location.search).get("character"))
  )
  const [errorDetalle, setErrorDetalle] = useState("")

  // Se dispara al renderizar y cada vez que cambia urlActual
  useEffect(() => {
    let cancelado = false

    fetch(urlActual)
      .then(response => {
        if (!response.ok) throw new Error("Error " + response.status)
        return response.json()
      })
      .then(data => {
        if (cancelado) return
        // la API devuelve { count, next, prev, pages, results: [...] }
        setPersonajes(data.results || [])
        setInfo({ count: data.count, next: data.next, prev: data.prev, pages: data.pages })
      })
      .catch(err => {
        if (cancelado) return
        setPersonajes([])
        setInfo({})
        setError("No se pudo cargar la API: " + err.message)
      })
      .finally(() => {
        if (!cancelado) setCargando(false)
      })

    // limpieza: si cambia la URL antes de terminar, se ignora la respuesta anterior
    return () => { cancelado = true }
  }, [urlActual])

  useEffect(() => {
    const handlePopState = () => {
      const id = new URLSearchParams(window.location.search).get("character")
      setPersonajeSeleccionado(id)
      setCargandoDetalle(Boolean(id) && !personajes.some(
        personaje => String(personaje.id) === id
      ))
      setErrorDetalle("")
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [personajes])

  useEffect(() => {
    if (!personajeSeleccionado) return

    const personajeEnLista = personajes.find(
      personaje => String(personaje.id) === personajeSeleccionado
    )
    if (personajeEnLista) return

    let cancelado = false
    const cargarDetalle = async () => {
      try {
        const urlDetalle = new URL(urlActual)
        urlDetalle.pathname = `${urlDetalle.pathname.replace(/\/+$/, "")}/${encodeURIComponent(personajeSeleccionado)}`
        urlDetalle.search = ""
        urlDetalle.hash = ""

        const response = await fetch(urlDetalle)
        if (!response.ok) throw new Error(`Error ${response.status}`)
        const data = await response.json()
        if (!cancelado) setDetalle(data)
      } catch (err) {
        if (!cancelado) {
          setErrorDetalle(`No se pudo cargar el personaje: ${err.message}`)
        }
      } finally {
        if (!cancelado) setCargandoDetalle(false)
      }
    }

    cargarDetalle()
    return () => { cancelado = true }
  }, [personajeSeleccionado, personajes, urlActual])

  // Todo cambio de URL pasa por aquí (select, paginación y agregar)
  const cambiarUrl = (url) => {
    setCargando(true)
    setError("")
    setUrlActual(url)
  }

  const escribirPersonajeEnUrl = (id, replace = false) => {
    const url = new URL(window.location.href)
    if (id === null) {
      url.searchParams.delete("character")
    } else {
      url.searchParams.set("character", id)
    }

    const method = replace ? "replaceState" : "pushState"
    window.history[method]({}, "", `${url.pathname}${url.search}${url.hash}`)
  }

  const abrirDetalle = (personaje) => {
    setDetalle(personaje)
    setCargandoDetalle(false)
    setErrorDetalle("")
    setPersonajeSeleccionado(String(personaje.id))
    escribirPersonajeEnUrl(personaje.id)
  }

  const cerrarDetalle = () => {
    escribirPersonajeEnUrl(null, true)
    setPersonajeSeleccionado(null)
    setCargandoDetalle(false)
    setErrorDetalle("")
  }

  const handleAdd = (url) => {
    if (!apis.includes(url)) setApis([...apis, url])
    cambiarUrl(url)
  }

  const personajeVisible = personajes.find(
    personaje => String(personaje.id) === personajeSeleccionado
  ) || (String(detalle?.id) === personajeSeleccionado ? detalle : null)

  return (
    <main>
      <Browser
        apis={apis}
        urlActual={urlActual}
        onSelect={cambiarUrl}
        onAdd={handleAdd}
      />

      {cargando && <p>Cargando...</p>}
      {error && <p id="error">{error}</p>}

      {info.count && (
        <p>Total: {info.count} resultados — {info.pages} páginas</p>
      )}

      <section id="cards">
        {
          personajes.map(personaje => (
              <CardCharacter key={personaje.id} character={personaje} onOpen={abrirDetalle} />
          ))
        }
      </section>

      <div id="paginacion">
        <button disabled={!info.prev} onClick={() => cambiarUrl(info.prev)}>Anterior</button>
        <button disabled={!info.next} onClick={() => cambiarUrl(info.next)}>Siguiente</button>
      </div>

      {personajeSeleccionado && (
        <CardDetail
          character={personajeVisible}
          loading={cargandoDetalle && !personajeVisible}
          error={!personajeVisible ? errorDetalle : ""}
          onClose={cerrarDetalle}
        />
      )}
    </main>
  )
}

export default Main
