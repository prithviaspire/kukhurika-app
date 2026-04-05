import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function ConfettiBurst({ spread = 70, particleCount = 120 }: { spread?: number; particleCount?: number }) {
	useEffect(() => {
		confetti({ origin: { y: 0.6 }, spread, particleCount })
	}, [spread, particleCount])
	return null
}
