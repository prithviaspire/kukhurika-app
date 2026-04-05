import { useRewards } from '../state/RewardsContext'

export default function Reward() {
	const { stars, badges, stickers, reset } = useRewards()
	return (
		<div className="font-fun">
			<h2 className="text-3xl font-extrabold text-forestGreen mb-4">Your Rewards</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="rounded-3xl bg-yellow-100 p-5 shadow-bubble">
					<div className="text-xl font-bold mb-2">Stars ⭐</div>
					<div className="text-4xl">{stars}</div>
				</div>
				<div className="rounded-3xl bg-sky-100 p-5 shadow-bubble">
					<div className="text-xl font-bold mb-2">Badges 🎖️</div>
					<div className="flex flex-wrap gap-2">
						{badges.length === 0 ? <span>No badges yet</span> : badges.map((b) => (
							<span key={b} className="px-3 py-1 rounded-full bg-white shadow">{b}</span>
						))}
					</div>
				</div>
				<div className="rounded-3xl bg-pink-100 p-5 shadow-bubble">
					<div className="text-xl font-bold mb-2">Stickers 🐾</div>
					<div className="flex flex-wrap gap-2">
						{stickers.length === 0 ? <span>No stickers yet</span> : stickers.map((s) => (
							<span key={s} className="px-3 py-1 rounded-full bg-white shadow">{s}</span>
						))}
					</div>
				</div>
			</div>
			<button className="mt-6 px-6 py-3 rounded-2xl bg-white shadow hover:bg-red-50" onClick={reset}>Reset</button>
		</div>
	)
}
