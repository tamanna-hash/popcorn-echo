import MovieCard from './MovieCard.jsx'
import { Film } from './icons.jsx'

export default function MovieGrid({ movies, loading, error, query, onSeeDetails }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[2/3] animate-pulse rounded-2xl bg-white/5" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl glass-panel py-16 text-center">
        <p className="text-slate-300">{error}</p>
        <p className="text-sm text-slate-500">Try refreshing the page.</p>
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl glass-panel py-16 text-center">
        <Film className="h-8 w-8 text-slate-600" />
        <p className="text-slate-300">
          {query ? `No results for "${query}".` : 'No movies to show yet.'}
        </p>
        <p className="text-sm text-slate-500">Try a different title.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onSeeDetails={onSeeDetails} />
      ))}
    </div>
  )
}
