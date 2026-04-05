import { Link } from 'react-router-dom'

export default function HomeLink() {
	return (
		<div className="mb-3">
			<Link to="/" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white shadow-bubble border border-slate-200 text-slate-700 hover:bg-slate-50">
				<span>🏠</span>
				<span className="font-bold">Home</span>
			</Link>
		</div>
	)
}
