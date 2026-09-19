import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Listing from './pages/Listing.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Listing />} />
          <Route path="/movies/:id" element={<Listing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-32 text-center">
      <h1 className="text-3xl font-semibold text-slate-50">Page not found</h1>
      <p className="text-slate-400">The page you're looking for doesn't exist.</p>
    </div>
  )
}
