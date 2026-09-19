import { useState } from 'react'
import { Mail, Github } from '../components/icons.jsx'

const CONTACT_EMAIL = 'popcorn@echo.com'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent(`PopcornEcho message from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <div className="max-w-xl">
        <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">Get in touch</h1>
        <p className="mt-4 leading-relaxed text-slate-400">
          Found a bug, have a feature idea, or just want to say hello? Send a
          message and it'll open in your email client, ready to send.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-3xl glass-panel p-6 sm:p-8">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-300">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="input-glass"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="input-glass"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="What's on your mind?"
              className="input-glass resize-none"
            />
          </div>

          <button type="submit" className="btn-primary mt-2 self-start">
            Send message
          </button>

          {sent && (
            <p className="text-sm text-glow-cyan">
              Opening your email client — finish sending it there.
            </p>
          )}
        </form>

        <div className="flex flex-col gap-4">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-3 rounded-2xl glass-panel p-5 transition-colors hover:border-glow-violet/40"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-glow-cyan">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm text-slate-400">Email</p>
              <p className="font-medium text-slate-100">{CONTACT_EMAIL}</p>
            </div>
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-2xl glass-panel p-5 transition-colors hover:border-glow-violet/40"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-glow-cyan">
              <Github className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm text-slate-400">GitHub</p>
              <p className="font-medium text-slate-100">Source & other projects</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
