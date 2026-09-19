import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import MovieCard from '../components/MovieCard.jsx'
import { fetchAllShows } from '../api/tvmaze.js'
import { Search, Film, PlayCircle, TrendingUp, Tag } from '../components/icons.jsx'

const steps = [
  {
    icon: Search,
    title: 'Search any title',
    body: 'Type a name and get live matches straight from the TVMaze catalog as you type.',
  },
  {
    icon: Film,
    title: 'Browse the grid',
    body: 'Scan posters, ratings, and release years laid out in a clean, responsive grid.',
  },
  {
    icon: PlayCircle,
    title: 'Open the details',
    body: 'Tap a card to see the full overview, genres, and cast in one focused view.',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const [catalog, setCatalog] = useState([])

  useEffect(() => {
    let cancelled = false
    fetchAllShows()
      .then((shows) => {
        if (!cancelled) setCatalog(shows)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  const posters = useMemo(() => catalog.slice(0, 20), [catalog])

  const trending = useMemo(
    () =>
      [...catalog]
        .filter((m) => m.rating)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 10),
    [catalog]
  )

  const topGenres = useMemo(() => {
    const counts = new Map()
    catalog.forEach((m) =>
      m.genres.forEach((g) => counts.set(g, (counts.get(g) || 0) + 1))
    )
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([genre]) => genre)
  }, [catalog])

  return (
    <>
      <Hero posters={posters} />

      <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl glass-panel p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-glow-cyan">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-slate-50">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {trending.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <TrendingUp className="h-5 w-5 text-glow-cyan" />
              <h2 className="font-display text-2xl font-semibold text-slate-50">
                Top rated right now
              </h2>
            </div>
            <Link
              to="/movies"
              className="hidden text-sm font-medium text-slate-400 hover:text-slate-100 sm:block"
            >
              View all
            </Link>
          </div>

          <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8">
            {trending.map((movie) => (
              <div key={movie.id} className="w-40 flex-none snap-start sm:w-48">
                <MovieCard
                  movie={movie}
                  onSeeDetails={(id) => navigate(`/movies/${id}`)}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {topGenres.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
          <div className="mb-6 flex items-center gap-2.5">
            <Tag className="h-5 w-5 text-glow-cyan" />
            <h2 className="font-display text-2xl font-semibold text-slate-50">
              Browse by genre
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {topGenres.map((genre) => (
              <Link
                key={genre}
                to={`/movies?genre=${encodeURIComponent(genre)}`}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-glow-violet/40 hover:bg-white/10 hover:text-slate-50"
              >
                {genre}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="flex flex-col items-center gap-5 rounded-3xl glass-panel px-6 py-14 text-center shadow-glow-cyan">
          <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
            Ready to find something to watch tonight?
          </h2>
          <p className="max-w-md text-slate-400">
            Jump into the full catalog and start searching — no account, no
            waiting.
          </p>
          <Link to="/movies" className="btn-primary">
            Explore Now
          </Link>
        </div>
      </section>
    </>
  )
}
