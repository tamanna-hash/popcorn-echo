import { Star, Calendar, Film } from './icons.jsx'

export default function MovieCard({ movie, onSeeDetails }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl glass-panel transition-all duration-300 hover:-translate-y-1 hover:border-glow-violet/40 hover:shadow-glow">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-void-800">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-600">
            <Film className="h-10 w-10" />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void-950/80 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug text-slate-50">
          {movie.title}
        </h3>

        <div className="flex items-center gap-3 text-sm text-slate-400">
          <span className="flex items-center gap-1 text-glow-amber">
            <Star className="h-3.5 w-3.5" />
            {movie.rating ?? '—'}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {movie.year}
          </span>
        </div>

        <button
          onClick={() => onSeeDetails(movie.id)}
          className="mt-auto rounded-full border border-white/15 bg-white/5 py-2 text-sm font-medium text-slate-100 transition-colors hover:bg-gradient-to-r hover:from-glow-violet hover:to-glow-cyan hover:text-void-950 hover:border-transparent"
        >
          See Details
        </button>
      </div>
    </article>
  )
}
