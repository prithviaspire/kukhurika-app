import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useRewards } from '../state/RewardsContext'
import { useEffect, useState } from 'react'

export default function Home() {
	const { stars, badges, stickers } = useRewards()
	const [activity, setActivity] = useState<{ english: { played: string[]; next: string }; math: { played: string[]; next: string }; science: { played: string[]; next: string }; nepali: { played: string[]; next: string } }>({
		english: { played: [], next: 'Try Phonics Bubbles' },
		math: { played: [], next: 'Ride the Number Train' },
		science: { played: [], next: 'Sort Living vs Non‑Living' },
		nepali: { played: [], next: 'Match Words & Pictures' },
	})

	useEffect(() => {
		try {
			const get = (k: string, fallback: string[]) => {
				const raw = localStorage.getItem(k)
				if (!raw) return fallback
				const val = JSON.parse(raw)
				return Array.isArray(val) ? (val as string[]) : fallback
			}
			setActivity((prev) => ({
				english: { played: get('played_english', prev.english.played.length ? prev.english.played : ['Treasure Hunt']), next: prev.english.next },
				math: { played: get('played_math', prev.math.played.length ? prev.math.played : ['Number Train']), next: prev.math.next },
				science: { played: get('played_science', prev.science.played.length ? prev.science.played : ['Living vs Non‑Living']), next: prev.science.next },
				nepali: { played: get('played_nepali', prev.nepali.played.length ? prev.nepali.played : ['Word & Picture Match']), next: prev.nepali.next },
			}))
		} catch {}
	}, [])

	return (
		<div className="font-fun">
			{/* Hero */}
			<section className="text-center mb-8">
				<motion.img
					src="/assets/logo.jpeg"
					alt="Kukhuri Ka logo"
					className="mx-auto h-20 w-20 rounded-2xl shadow-bubble mb-3"
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ type: 'spring', stiffness: 140 }}
				/>
				<motion.h1 initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl md:text-5xl font-extrabold text-forestGreen">
					Let's Play & Learn!
				</motion.h1>
				<p className="text-lg text-slate-700 mt-2 max-w-2xl mx-auto">A playful space for little learners. Fun mini‑games for English, Math, Science and Nepali—made for tiny hands and big smiles.</p>
				<div className="mt-4 flex items-center justify-center gap-3">
					<Link to="/english" className="px-6 py-3 rounded-2xl bg-sunshineYellow text-forestGreen font-extrabold shadow-bubble hover:scale-105 transition">Start Playing</Link>
					<Link to="/reward" className="px-6 py-3 rounded-2xl bg-candyPink text-white font-extrabold shadow-bubble hover:scale-105 transition">My Rewards</Link>
				</div>
				{/* Animated fun icons row */}
				<motion.div
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ type: 'spring', stiffness: 140, delay: 0.1 }}
					className="mt-4 flex flex-wrap items-center justify-center gap-3"
				>
					<motion.div
						className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white shadow-bubble border border-yellow-200"
						animate={{ y: [0, -4, 0] }}
						transition={{ duration: 2, repeat: Infinity }}
						whileHover={{ scale: 1.05 }}
						aria-label="Stars"
					>
						<span className="text-yellow-500 text-xl">⭐</span>
						<span className="font-extrabold text-slate-800">Stars</span>
						<span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-bold">{stars}</span>
					</motion.div>

					<motion.div
						className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white shadow-bubble border border-sky-200"
						animate={{ y: [0, -4, 0] }}
						transition={{ duration: 2.2, repeat: Infinity, delay: 0.2 }}
						whileHover={{ scale: 1.05 }}
						aria-label="Buttons"
					>
						<span className="text-sky-600 text-xl">🔘</span>
						<span className="font-extrabold text-slate-800">Buttons</span>
						<span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 font-bold">{badges.length}</span>
					</motion.div>

					<motion.div
						className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white shadow-bubble border border-pink-200"
						animate={{ y: [0, -4, 0] }}
						transition={{ duration: 2.4, repeat: Infinity, delay: 0.4 }}
						whileHover={{ scale: 1.05 }}
						aria-label="Magic Cap"
					>
						<span className="text-pink-600 text-xl">🎩</span>
						<span className="font-extrabold text-slate-800">Magic Cap</span>
					</motion.div>

					<motion.div
						className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white shadow-bubble border border-green-200"
						animate={{ y: [0, -4, 0] }}
						transition={{ duration: 2.6, repeat: Infinity, delay: 0.6 }}
						whileHover={{ scale: 1.05 }}
						aria-label="Sticks"
					>
						<span className="text-green-600 text-xl">🖼️</span>
						<span className="font-extrabold text-slate-800">Sticks</span>
						<span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-bold">{stickers.length}</span>
					</motion.div>
				</motion.div>
			</section>

			{/* Subjects with mini dashboards */}
			<section className="grid sm:grid-cols-2 gap-4 mb-8">
				{/* English */}
				<div className="rounded-2xl p-4 bg-gradient-to-br from-yellow-100 to-pink-100 shadow-bubble">
					<h2 className="text-2xl font-extrabold text-sky-700 mb-3">🅰️ English</h2>
					<div className="flex flex-wrap gap-2 mb-3">
						<Link to="/english/treasure" className="px-4 py-2 rounded-xl bg-yellow-300 hover:bg-yellow-400 font-bold">Treasure Hunt</Link>
						<Link to="/english/phonics" className="px-4 py-2 rounded-xl bg-pink-300 hover:bg-pink-400 text-white font-bold">Phonics Bubbles</Link>
					</div>
					<div className="rounded-xl bg-white p-3 shadow-sm border border-yellow-200">
						<div className="text-sm font-extrabold text-sky-700">Dashboard</div>
						<div className="mt-2 flex flex-wrap gap-2">
							{activity.english.played.map(p => <span key={p} className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 font-bold">{p}</span>)}
						</div>
						<div className="mt-2 flex items-center gap-2 text-sm">
							<span className="px-2 py-1 rounded-lg bg-yellow-100 font-bold">⭐ {stars}</span>
							<span className="px-2 py-1 rounded-lg bg-sky-100 font-bold">🎖️ {badges.length}</span>
							<span className="px-2 py-1 rounded-lg bg-pink-100 font-bold">🖼️ {stickers.length}</span>
						</div>
						<div className="mt-2 text-sm text-slate-700"><span className="font-bold">Next:</span> {activity.english.next}</div>
					</div>
				</div>

				{/* Math */}
				<div className="rounded-2xl p-4 bg-gradient-to-br from-green-100 to-sky-100 shadow-bubble">
					<h2 className="text-2xl font-extrabold text-green-700 mb-3">🔢 Math</h2>
					<div className="flex flex-wrap gap-2 mb-3">
						<Link to="/math/train" className="px-4 py-2 rounded-xl bg-green-300 hover:bg-green-400 font-bold">Number Train</Link>
					</div>
					<div className="rounded-xl bg-white p-3 shadow-sm border border-green-200">
						<div className="text-sm font-extrabold text-green-700">Dashboard</div>
						<div className="mt-2 flex flex-wrap gap-2">
							{activity.math.played.map(p => <span key={p} className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-bold">{p}</span>)}
						</div>
						<div className="mt-2 flex items-center gap-2 text-sm">
							<span className="px-2 py-1 rounded-lg bg-green-100 font-bold">⭐ {stars}</span>
							<span className="px-2 py-1 rounded-lg bg-sky-100 font-bold">🎖️ {badges.length}</span>
							<span className="px-2 py-1 rounded-lg bg-pink-100 font-bold">🖼️ {stickers.length}</span>
						</div>
						<div className="mt-2 text-sm text-slate-700"><span className="font-bold">Next:</span> {activity.math.next}</div>
					</div>
				</div>

				{/* Science */}
				<div className="rounded-2xl p-4 bg-gradient-to-br from-sky-100 to-yellow-100 shadow-bubble">
					<h2 className="text-2xl font-extrabold text-sky-700 mb-3">🧪 Science</h2>
					<div className="flex flex-wrap gap-2 mb-3">
						<Link to="/science/living-sort" className="px-4 py-2 rounded-xl bg-sky-300 hover:bg-sky-400 font-bold">Living vs Non‑Living</Link>
					</div>
					<div className="rounded-xl bg-white p-3 shadow-sm border border-sky-200">
						<div className="text-sm font-extrabold text-sky-700">Dashboard</div>
						<div className="mt-2 flex flex-wrap gap-2">
							{activity.science.played.map(p => <span key={p} className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 font-bold">{p}</span>)}
						</div>
						<div className="mt-2 flex items-center gap-2 text-sm">
							<span className="px-2 py-1 rounded-lg bg-yellow-100 font-bold">⭐ {stars}</span>
							<span className="px-2 py-1 rounded-lg bg-sky-100 font-bold">🎖️ {badges.length}</span>
							<span className="px-2 py-1 rounded-lg bg-pink-100 font-bold">🖼️ {stickers.length}</span>
						</div>
						<div className="mt-2 text-sm text-slate-700"><span className="font-bold">Next:</span> {activity.science.next}</div>
					</div>
				</div>

				{/* Nepali */}
				<div className="rounded-2xl p-4 bg-gradient-to-br from-orange-100 to-green-100 shadow-bubble">
					<h2 className="text-2xl font-extrabold text-orange-700 mb-3">🇳🇵 Nepali</h2>
					<div className="flex flex-wrap gap-2 mb-3">
						<Link to="/nepali/alphabet-match" className="px-4 py-2 rounded-xl bg-orange-300 hover:bg-orange-400 font-bold">Word & Picture Match</Link>
					</div>
					<div className="rounded-xl bg-white p-3 shadow-sm border border-orange-200">
						<div className="text-sm font-extrabold text-orange-700">Dashboard</div>
						<div className="mt-2 flex flex-wrap gap-2">
							{activity.nepali.played.map(p => <span key={p} className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-bold">{p}</span>)}
						</div>
						<div className="mt-2 flex items-center gap-2 text-sm">
							<span className="px-2 py-1 rounded-lg bg-green-100 font-bold">⭐ {stars}</span>
							<span className="px-2 py-1 rounded-lg bg-sky-100 font-bold">🎖️ {badges.length}</span>
							<span className="px-2 py-1 rounded-lg bg-pink-100 font-bold">🖼️ {stickers.length}</span>
						</div>
						<div className="mt-2 text-sm text-slate-700"><span className="font-bold">Next:</span> {activity.nepali.next}</div>
					</div>
				</div>
			</section>

			{/* Parent & Teacher Dashboard Preview */}
			<section className="mb-8">
				<h2 className="text-2xl font-extrabold text-forestGreen text-center mb-3">👪 Dashboard for Parents & Teachers</h2>
				<p className="text-center text-slate-700 mb-4">A simple snapshot—no charts! See progress at a glance.</p>
				<div className="grid md:grid-cols-3 gap-4">
					<div className="rounded-2xl p-4 bg-white shadow-bubble border border-green-200">
						<div className="text-lg font-extrabold text-green-700">Stars Earned</div>
						<div className="text-3xl font-extrabold mt-2">⭐ {stars}</div>
						<div className="text-sm text-slate-600 mt-1">Great job collecting stars!</div>
					</div>
					<div className="rounded-2xl p-4 bg-white shadow-bubble border border-sky-200">
						<div className="text-lg font-extrabold text-sky-700">Badges Unlocked</div>
						<div className="mt-2 flex flex-wrap gap-2">
							{badges.length === 0 ? <span className="text-slate-500">No badges yet</span> : badges.map(b => (
								<span key={b} className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 font-bold shadow-sm">{b}</span>
							))}
						</div>
						<div className="text-sm text-slate-600 mt-2">Badges celebrate milestones.</div>
					</div>
					<div className="rounded-2xl p-4 bg-white shadow-bubble border border-pink-200">
						<div className="text-lg font-extrabold text-pink-700">Stickers Collected</div>
						<div className="mt-2 flex flex-wrap gap-2">
							{stickers.length === 0 ? <span className="text-slate-500">No stickers yet</span> : stickers.map(s => (
								<span key={s} className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 font-bold shadow-sm">{s}</span>
							))}
						</div>
						<div className="text-sm text-slate-600 mt-2">Kids love collecting these!</div>
					</div>
				</div>
				<div className="mt-4 grid md:grid-cols-2 gap-4">
					<div className="rounded-2xl p-4 bg-gradient-to-r from-green-50 to-white border border-green-200 shadow-bubble">
						<div className="font-extrabold text-green-700">Recent Activity</div>
						<ul className="mt-2 text-slate-700 text-sm list-disc list-inside">
							<li>Played English: Treasure Hunt</li>
							<li>Practiced Nepali: Word & Picture Match</li>
							<li>Explored Science: Living vs Non‑Living</li>
						</ul>
					</div>
					<div className="rounded-2xl p-4 bg-gradient-to-r from-sky-50 to-white border border-sky-200 shadow-bubble">
						<div className="font-extrabold text-sky-700">Tips for Grown‑ups</div>
						<ul className="mt-2 text-slate-700 text-sm list-disc list-inside">
							<li>Short sessions keep learning fun.</li>
							<li>Celebrate small wins with a sticker goal.</li>
							<li>Let kids choose which game to play next.</li>
						</ul>
					</div>
				</div>
			</section>
		</div>
	)
}
