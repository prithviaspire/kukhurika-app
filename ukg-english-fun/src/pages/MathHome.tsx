import { Link } from 'react-router-dom'

export default function MathHome() {
	return (
		<div className="font-fun text-center">
			<h1 className="text-4xl font-extrabold text-forestGreen mb-3">Mathematics</h1>
			<p className="text-slate-700 mb-6">Ride the number train and learn 0–50!</p>
			<Link to="/math/train" className="px-8 py-4 rounded-2xl bg-green-300 text-green-900 font-bold shadow-bubble hover:scale-105 transition">Start Number Train Ride →</Link>
		</div>
	)
}
