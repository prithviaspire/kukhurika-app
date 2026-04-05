import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-magical">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur shadow-bubble">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group" aria-label="Kukhuri Ka Home">
            <img
              src="/assets/logo.jpeg"
              alt="Kukhuri Ka logo"
              className="h-10 w-10 rounded-2xl shadow-md group-hover:scale-105 transition"
              loading="eager"
            />
            <span className="text-2xl font-extrabold text-forestGreen tracking-tight">
              Kukhuri Ka
            </span>
          </Link>
          <nav className="flex gap-3">
            <Link className="px-4 py-2 rounded-full bg-yellow-300 hover:bg-yellow-400 transition" to="/english">English</Link>
            <Link className="px-4 py-2 rounded-full bg-green-300 hover:bg-green-400 transition" to="/math">Math</Link>
            <Link className="px-4 py-2 rounded-full bg-sky-300 hover:bg-sky-400 transition" to="/science">Science</Link>
            <Link className="px-4 py-2 rounded-full bg-orange-300 hover:bg-orange-400 transition" to="/nepali">Nepali</Link>
            <Link className="px-4 py-2 rounded-full bg-pink-300 hover:bg-pink-400 transition" to="/reward">Rewards</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default App
