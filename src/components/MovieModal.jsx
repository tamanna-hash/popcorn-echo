import { useEffect, useRef } from 'react'
import { X, Star, Calendar, Film } from './icons.jsx'

export default function MovieModal({ movie, loading, error, onClose }) {
  const panelRef = useRef(null)

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      onMouseDown={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-void-950/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={movie ? movie.title : 'Movie details'}
    >
      <div
        ref={panelRef}
        className="modal-scroll relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-void-900 shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-void-950/70 text-slate-200 backdrop-blur transition-colors hover:bg-white/10"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        {loading && (
          <div className="flex h-80 items-center justify-center text-slate-500">
            Loading details…
          </div>
        )}

        {error && !loading && (
          <div className="flex h-80 flex-col items-center justify-center gap-2 text-center">
            <p className="text-slate-300">{error}</p>
            <button onClick={onClose} className="btn-ghost mt-2 !px-5 !py-2 text-sm">
              Close
            </button>
          </div>
        )}

        {movie && !loading && !error && (
          <>
            <div className="relative h-64 w-full overflow-hidden sm:h-80">
              {movie.backdrop ? (
                <img
                  src={movie.backdrop}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-void-800 text-slate-600">
                  <Film className="h-12 w-12" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-void-900 via-void-900/30 to-transparent" />
            </div>

            <div className="px-6 pb-8 pt-2 sm:px-8">
              <h2 className="font-display text-2xl font-semibold text-slate-50 sm:text-3xl">
                {movie.title}
              </h2>

              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-300">
                <span className="flex items-center gap-1.5 text-glow-amber">
                  <Star className="h-4 w-4" />
                  {movie.rating ? `${movie.rating} / 10` : 'Not yet rated'}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {movie.premiered || 'TBA'}
                </span>
                <span>{movie.network}</span>
                {movie.runtime && <span>{movie.runtime} min / ep</span>}
              </div>

              {movie.genres?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {movie.genres.map((g) => (
                    <span
                      key={g}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Overview
                </h3>
                <p className="mt-2 leading-relaxed text-slate-300">
                  {movie.summary || 'No overview available for this title.'}
                </p>
              </div>

              {movie.cast?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Cast
                  </h3>
                  <p className="mt-2 text-slate-300">{movie.cast.join(', ')}</p>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <button onClick={onClose} className="btn-ghost text-sm">
                  <X className="h-4 w-4" />
                  Close
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
