import { Link } from 'react-router-dom'

export default function ScienceHome() {
	return (
		<div className="font-fun text-center">
			<h1 className="text-4xl font-extrabold text-forestGreen mb-3">Science</h1>
			<p className="text-slate-700 mb-6">Explore living and non-living things in our world!</p>
			<Link to="/science/living-sort" className="px-8 py-4 rounded-2xl bg-sky-300 text-sky-900 font-bold shadow-bubble hover:scale-105 transition">Play Living vs Non-Living →</Link>
		</div>
	)
}


