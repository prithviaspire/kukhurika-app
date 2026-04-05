export default function StarsCounter({ stars }: { stars: number }) {
	return (
		<div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-3 py-1 shadow-bubble">
			<span className="text-yellow-500">⭐</span>
			<span className="font-bold">{stars}</span>
		</div>
	)
}
