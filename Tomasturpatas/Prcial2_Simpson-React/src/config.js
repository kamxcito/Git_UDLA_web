export const IMAGE_BASE = "https://cdn.thesimpsonsapi.com/500/character/"

export const getImageUrl = (id) => `${IMAGE_BASE}${id}.webp`

export const CHARACTERS_URL = "https://thesimpsonsapi.com/api/characters"

export const DEFAULT_APIS = [CHARACTERS_URL]
