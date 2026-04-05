import { Link } from 'react-router-dom'

export default function NepaliHome() {
	return (
		<div className="font-fun text-center">
			<h1 className="text-4xl font-extrabold text-forestGreen mb-3">Nepali</h1>
			<p className="text-slate-700 mb-6">Learn Nepali alphabets with fun pictures!</p>
			<Link to="/nepali/alphabet-match" className="px-8 py-4 rounded-2xl bg-orange-300 text-orange-900 font-bold shadow-bubble hover:scale-105 transition">Play Nepali Alphabet Match →</Link>
		</div>
	)
}
