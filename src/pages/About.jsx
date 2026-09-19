import { Link } from 'react-router-dom'
import { Search, Film, PlayCircle, Github, Mail } from '../components/icons.jsx'

const features = [
  {
    icon: Search,
    title: 'Live search',
    body: 'Every keystroke queries the TVMaze catalog directly — no stale, pre-baked lists.',
  },
  {
    icon: Film,
    title: 'Real catalog data',
    body: 'Posters, ratings, premiere dates, and genres all come straight from the API.',
  },
  {
    icon: PlayCircle,
    title: 'Focused details',
    body: 'One click opens a clean overlay with the overview, cast, and everything else worth knowing.',
  },
]

const stack = [
  'React',
  'Vite',
  'Tailwind CSS',
  'React Router',
  'TVMaze API',
]

export default function About() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <div className="max-w-xl">
        <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
          About PopcornEcho
        </h1>
        <p className="mt-4 leading-relaxed text-slate-400">
          PopcornEcho is a small, focused app for browsing and searching
          shows without the clutter. It's built as a front-end learning
          project — the whole thing runs on the free, keyless TVMaze API, so
          there's no backend or account to manage.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {features.map(({ icon: Icon, title, body }) => (
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

      <div className="mt-14">
        <h2 className="font-display text-xl font-semibold text-slate-50">
          Built with
        </h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-4 rounded-3xl glass-panel p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold text-slate-50">
            Made by Tamanna Sultana
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Full-stack developer. Questions or feedback are always welcome.
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="mailto:popcorn@echo.com"
            className="btn-ghost !px-5 !py-2.5 text-sm"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost !px-5 !py-2.5 text-sm"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link to="/movies" className="text-sm font-medium text-glow-cyan hover:underline">
          Start exploring the catalog
        </Link>
      </div>
    </section>
  )
}
