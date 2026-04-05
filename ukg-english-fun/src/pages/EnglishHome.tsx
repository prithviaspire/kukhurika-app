import { Link } from 'react-router-dom'

export default function EnglishHome() {
	return (
		<div className="font-fun text-center">
			<h1 className="text-4xl font-extrabold text-forestGreen mb-3">English</h1>
			<p className="text-slate-700 mb-6">Play fun alphabet and phonics games!</p>
			<div className="flex items-center justify-center gap-3 flex-wrap">
				<Link to="/english/treasure" className="px-8 py-4 rounded-2xl bg-sunshineYellow text-forestGreen font-bold shadow-bubble hover:scale-105 transition">
					Alphabet Treasure Hunt →
				</Link>
				<Link to="/english/phonics" className="px-8 py-4 rounded-2xl bg-candyPink text-white font-bold shadow-bubble hover:scale-105 transition">
					Phonics Pop Bubbles →
				</Link>
			</div>
		</div>
	)
}
