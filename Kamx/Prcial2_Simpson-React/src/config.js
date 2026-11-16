export const DEFAULT_APIS = [
  "https://thesimpsonsapi.com/api/characters",
]

const IMAGE_BASE = "https://cdn.thesimpsonsapi.com/500/character/"

export const getImageUrl = (id) => `${IMAGE_BASE}${id}.webp`
