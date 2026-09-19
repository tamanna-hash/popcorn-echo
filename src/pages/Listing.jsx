import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import MovieModal from '../components/MovieModal.jsx'
import Pagination from '../components/Pagination.jsx'
import { X } from '../components/icons.jsx'
import { fetchAllShows, searchShows, fetchShowById } from '../api/tvmaze.js'

const ITEMS_PER_PAGE = 12

export default function Listing() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') || ''
  const genre = searchParams.get('genre') || ''
  const page = parseInt(searchParams.get('page') || '1', 10)

  const [inputValue, setInputValue] = useState(query)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selected, setSelected] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)
  const [modalError, setModalError] = useState(null)

  // Debounce the search box into the ?q= URL param (and reset pagination).
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = inputValue.trim()
      const current = searchParams.get('q') || ''
      if (trimmed === current) return
      const next = new URLSearchParams(searchParams)
      if (trimmed) next.set('q', trimmed)
      else next.delete('q')
      next.delete('page')
      setSearchParams(next, { replace: true })
    }, 350)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  // Fetch whenever the search query changes.
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    const request = query ? searchShows(query) : fetchAllShows()
    request
      .then((data) => {
        if (!cancelled) {
          setMovies(data)
          setError(null)
        }
      })
      .catch(() => {
        if (!cancelled) setError('Something went wrong loading movies.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [query])

  // Client-side genre filter (TVMaze has no genre query param).
  const filteredMovies = useMemo(() => {
    if (!genre) return movies
    return movies.filter((m) => m.genres.includes(genre))
  }, [movies, genre])

  const genres = useMemo(() => {
    const set = new Set()
    movies.forEach((m) => m.genres.forEach((g) => set.add(g)))
    return Array.from(set).sort()
  }, [movies])

  const totalPages = Math.max(1, Math.ceil(filteredMovies.length / ITEMS_PER_PAGE))
  const safePage = Math.min(Math.max(page, 1), totalPages)
  const paginatedMovies = filteredMovies.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  )

  function goToPage(p) {
    const next = new URLSearchParams(searchParams)
    if (p <= 1) next.delete('page')
    else next.set('page', String(p))
    setSearchParams(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function setGenre(g) {
    const next = new URLSearchParams(searchParams)
    if (!g) next.delete('genre')
    else next.set('genre', g)
    next.delete('page')
    setSearchParams(next)
  }

  // Sync the modal to the :id route param.
  useEffect(() => {
    if (!id) {
      setSelected(null)
      return
    }
    let cancelled = false
    setModalLoading(true)
    setModalError(null)
    fetchShowById(id)
      .then((data) => {
        if (!cancelled) setSelected(data)
      })
      .catch(() => {
        if (!cancelled) setModalError('Could not load this title.')
      })
      .finally(() => {
        if (!cancelled) setModalLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <div className="mb-10 max-w-xl">
        <h1 className="text-3xl font-semibold text-slate-50">Browse the catalog</h1>
        <p className="mt-2 text-slate-400">
          Search by title or scroll the full TVMaze catalog below.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="max-w-xl flex-1">
          <SearchBar value={inputValue} onChange={setInputValue} />
        </div>

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="input-glass w-full sm:w-48"
          aria-label="Filter by genre"
        >
          <option value="" className="bg-black/80 text-slate-300">All genres</option>
          {genres.map((g) => (
            <option key={g} value={g} className="bg-black/80 text-slate-300">
              {g}
            </option>
          ))}
        </select>
      </div>

      {genre && (
        <button
          onClick={() => setGenre('')}
          className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-slate-300 transition-colors hover:bg-white/10"
        >
          {genre}
          <X className="h-3.5 w-3.5" />
        </button>
      )}

      <MovieGrid
        movies={paginatedMovies}
        loading={loading}
        error={error}
        query={query || genre}
        onSeeDetails={(movieId) => navigate(`/movies/${movieId}${window.location.search}`)}
      />

      {!loading && !error && (
        <Pagination page={safePage} totalPages={totalPages} onPageChange={goToPage} />
      )}

      {id && (
        <MovieModal
          movie={selected}
          loading={modalLoading}
          error={modalError}
          onClose={() => navigate(`/movies${window.location.search}`)}
        />
      )}
    </section>
  )
}
