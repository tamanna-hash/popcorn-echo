# PopcornEcho

A responsive movie/show browser built with React, Vite, Tailwind CSS, and the
free [TVMaze API](https://www.tvmaze.com/api). No API key required.

<img src="https://i.ibb.co.com/msWQP1t/Screenshot-2026-09-19-141007.png" height="300px" width="400px">

🔗 **Live:** [https://popcorn-echo.vercel.app](https://popcorn-echo.vercel.app)

## Features

- **Home page** — hero with a floating poster collage pulled live from the
  API, a "how it works" strip, a horizontally-scrolling "Top rated right
  now" row, a "Browse by genre" chip section, and a closing CTA.
- **Movie Listing page** (`/movies`) — debounced search-by-title (backed by
  `GET /search/shows?q=`, falling back to the full catalog `GET /shows`
  when empty), a genre filter dropdown, and pagination (12 per page).
  Search, genre, and page are all kept in the URL (`?q=`, `?genre=`,
  `?page=`), so results are shareable and survive the back button.
  Responsive 2/3/4-column card grid.
- **Details modal** — opens at `/movies/:id` (linkable, back-button
  friendly, keeps any active search/genre/page in the URL), shows backdrop,
  rating, premiere date, genres, overview, and top cast. Closes via the ✕
  button, the Escape key, or a click on the backdrop.
- **About page** (`/about`) — what the app is, feature highlights, tech
  stack, and a contact card.
- **Contact page** (`/contact`) — a form that opens a pre-filled email via
  `mailto:` (no backend needed), plus direct email/GitHub cards.
- Dark glassmorphism visual theme with soft glow accents, built entirely
  with Tailwind utility classes — no external icon or component library,
  so there's nothing extra to install beyond what's in `package.json`.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  api/tvmaze.js        # fetch + normalize calls to the TVMaze API
  components/          # Navbar, Footer, Hero, SearchBar, MovieCard, MovieGrid,
                        # MovieModal, Pagination, icons
  pages/                # Home.jsx, Listing.jsx, About.jsx, Contact.jsx
  App.jsx               # routes
  main.jsx              # entry point + BrowserRouter
  index.css             # Tailwind layers + glassmorphism utility classes
```

## Notes

- The GitHub links in the Footer, About, and Contact pages point at
  `https://github.com` as a placeholder — swap in your actual profile URL.

- Styling uses hand-rolled Tailwind utility classes (`.glass-panel`,
  `.btn-primary`, `.btn-ghost`, `.input-glass`) that mimic a shadcn/ui-style
  design system without pulling in the shadcn CLI/Radix dependency tree —
  keeps the project a single `npm install` away from running. If you'd like
  actual shadcn/ui components wired in (e.g. `Dialog`, `Command`), running
  `npx shadcn@latest init` in this project and swapping `MovieModal`/
  `SearchBar` for their primitives is a straightforward follow-up.
- TVMaze's `/shows` endpoint returns TV series, not theatrical movies (it's
  a TV database) — the requirement doc points at it directly, so the app
  uses it as-is. Ratings, posters, and summaries are only as complete as
  TVMaze's own data for that title.
