import { Link } from 'react-router-dom'
import { Clapperboard, Github, Mail } from './icons.jsx'

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/movies', label: 'Movies' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-void-950">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-glow-cyan">
                <Clapperboard className="h-4 w-4" />
              </span>
              <span className="font-display text-sm font-semibold text-slate-200">
                PopcornEcho
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              A fast, focused way to search and browse shows using live data
              from the TVMaze catalog.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-slate-400 transition-colors hover:text-slate-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:text-slate-100"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="mailto:popcorn@echo.com"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:text-slate-100"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center text-sm text-slate-500">
          © 2026 PopcornEcho. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
