// Configuración compartida por los componentes

// La imagen del personaje cambia solo en el último segmento: /{id}.webp
export const IMAGE_BASE = "https://cdn.thesimpsonsapi.com/500/character/"

export const getImageUrl = (id) => `${IMAGE_BASE}${id}.webp`

// APIs que aparecen por defecto en el browser
export const DEFAULT_APIS = [
  "https://thesimpsonsapi.com/api/characters",
]
