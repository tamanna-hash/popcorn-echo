import { Link } from 'react-router-dom'
import { PlayCircle } from './icons.jsx'

export default function Hero({ posters = [] }) {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:pt-28">
      {/* ambient glow orbs */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-glow-violet/25 blur-[100px]" />
      <div className="pointer-events-none absolute -top-10 right-0 h-72 w-72 rounded-full bg-glow-cyan/20 blur-[110px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-xl">
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-slate-50 sm:text-5xl lg:text-[3.4rem]">
            Every story worth
            <br />
            watching, in one place.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-400">
            Search thousands of series and films, sorted, rated, and ready to
            queue up. PopcornEcho pulls live data straight from the TVMaze
            catalog so what you see is always current.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/movies" className="btn-primary">
              <PlayCircle className="h-5 w-5" />
              Explore Now
            </Link>
            <a href="#how-it-works" className="btn-ghost">
              How it works
            </a>
          </div>
        </div>

        <PosterCollage posters={posters} />
      </div>
    </section>
  )
}

function PosterCollage({ posters }) {
  const shown = posters.filter((p) => p.poster).slice(0, 5)

  if (shown.length === 0) {
    return (
      <div className="hidden aspect-[4/3] rounded-3xl glass-panel lg:block" />
    )
  }

  return (
    <div className="relative hidden aspect-[4/3] lg:block">
      {shown.map((movie, i) => (
        <PosterCard key={movie.id} movie={movie} index={i} />
      ))}
    </div>
  )
}

const layout = [
  'left-0 top-8 h-48 w-32 rotate-[-6deg] z-10',
  'left-24 top-0 h-56 w-36 rotate-[3deg] z-20',
  'left-52 top-16 h-52 w-34 rotate-[-2deg] z-30',
  'left-[15rem] top-[-0.5rem] h-44 w-28 rotate-[8deg] z-10',
  'left-8 top-[13rem] h-40 w-28 rotate-[10deg] z-0',
]

function PosterCard({ movie, index }) {
  return (
    <div
      className={`absolute overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/50 transition-transform duration-500 hover:z-40 hover:scale-105 ${layout[index % layout.length]}`}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  )
}
