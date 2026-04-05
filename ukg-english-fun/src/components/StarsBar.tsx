import { useRewards } from '../state/RewardsContext'

export default function StarsBar({ soundOn, onToggleSound }: { soundOn: boolean; onToggleSound: () => void }) {
	const { stars } = useRewards()
	return (
		<div className="flex items-center justify-between rounded-2xl bg-white/80 backdrop-blur px-4 py-2 shadow-bubble">
			<div className="text-xl font-bold">⭐ {stars}</div>
			<button aria-label={soundOn ? 'Turn sound off' : 'Turn sound on'} onClick={onToggleSound} className="px-3 py-1 rounded-full bg-yellow-200 hover:bg-yellow-300">
				{soundOn ? '🔊' : '🔈'}
			</button>
		</div>
	)
}
