const BASE_URL = 'https://api.tvmaze.com'

/**
 * Strips HTML tags TVMaze embeds in its summary fields.
 */
export function stripHtml(html) {
  if (!html) return ''
  return html.replace(/<[^>]+>/g, '')
}

/**
 * Normalizes a raw TVMaze show object (or a { show } search-result wrapper)
 * into the flat shape the UI components expect.
 */
export function normalizeShow(raw) {
  const show = raw.show ?? raw
  return {
    id: show.id,
    title: show.name,
    poster:
      show.image?.original ||
      show.image?.medium ||
      null,
    backdrop: show.image?.original || show.image?.medium || null,
    year: show.premiered ? show.premiered.slice(0, 4) : 'TBA',
    premiered: show.premiered,
    rating: show.rating?.average ?? null,
    genres: show.genres ?? [],
    summary: stripHtml(show.summary),
    network: show.network?.name || show.webChannel?.name || 'Unknown network',
    status: show.status,
    runtime: show.runtime || show.averageRuntime,
    officialSite: show.officialSite,
  }
}

/**
 * Fetches every show in TVMaze's catalog (used for the default browse grid).
 */
export async function fetchAllShows() {
  const res = await fetch(`${BASE_URL}/shows`)
  if (!res.ok) throw new Error('Failed to load shows')
  const data = await res.json()
  return data.map(normalizeShow)
}

/**
 * Searches shows by title.
 */
export async function searchShows(query) {
  const res = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`)
  if (!res.ok) throw new Error('Failed to search shows')
  const data = await res.json()
  return data.map(normalizeShow)
}

/**
 * Fetches a single show with its cast, for richer modal detail.
 */
export async function fetchShowById(id) {
  const res = await fetch(`${BASE_URL}/shows/${id}?embed=cast`)
  if (!res.ok) throw new Error('Failed to load show')
  const data = await res.json()
  const normalized = normalizeShow(data)
  const cast =
    data._embedded?.cast?.slice(0, 6).map((c) => c.person?.name).filter(Boolean) || []
  return { ...normalized, cast }
}
