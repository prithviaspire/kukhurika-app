import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Train } from '../components/Train'
import { useRewards } from '../state/RewardsContext'

//

function shuffle<T>(arr: T[]): T[] {
	return [...arr].sort(() => Math.random() - 0.5)
}

export default function NumberTrainRide() {
	const { addStars, unlockSticker } = useRewards()
	const [length] = useState(5)
	const [ascending, setAscending] = useState(true)
	const [slots, setSlots] = useState<(number | null)[]>(Array.from({ length }, () => null))
	const [pool, setPool] = useState<number[]>([])
	const [done, setDone] = useState(false)
	const [highlightIdx, setHighlightIdx] = useState<number | undefined>(undefined)
	const carriageRefs = useRef<HTMLDivElement[]>([])
	const containerRef = useRef<HTMLDivElement | null>(null)
	const trainRef = useRef<HTMLDivElement | null>(null)
	const [trainX, setTrainX] = useState(0)

	function setCarriageRef(el: HTMLDivElement | null, index: number) {
		if (el) carriageRefs.current[index] = el
	}

	useEffect(() => {
		const base = Array.from({ length }, () => null) as (number | null)[]
		if (ascending) base[0] = 0
		else base[0] = length - 1
		setSlots(base)
		if (ascending) {
			const seq = Array.from({ length: Math.max(0, length - 1) }, (_, i) => i + 1)
			setPool(shuffle(seq))
			setHighlightIdx(1)
		} else {
			const seq = Array.from({ length: Math.max(0, length - 1) }, (_, i) => i)
			setPool(shuffle(seq))
			setHighlightIdx(1)
		}
		setDone(false)
		setTrainX(0)
	}, [length, ascending])

	useEffect(() => {
		const allFilled = slots.every((v, i) => v !== null || i === 0)
		if (!allFilled) return
		const expected = ascending
			? Array.from({ length }, (_, i) => i)
			: Array.from({ length }, (_, i) => length - 1 - i)
		const current = slots.map((v, i) => (v === null && i === 0 ? (ascending ? 0 : length - 1) : (v as number)))
		const ok = expected.every((val, i) => current[i] === val)
		if (!ok) return
		setDone(true)
		// compute one-time glide to the right border
		requestAnimationFrame(() => {
			const container = containerRef.current
			const trainEl = trainRef.current
			if (!container || !trainEl) return
			const distance = Math.max(0, container.clientWidth - trainEl.clientWidth)
			const pixelsPerSecond = 300
			const duration = Math.max(0.4, distance / pixelsPerSecond)
			setTrainX(distance)
			// use duration via inline transition prop below
			;(trainEl as any).__rideDuration = duration
		})
		addStars(3)
		unlockSticker('Number Train')
	}, [slots, ascending, addStars, unlockSticker, length])

	const prompt = useMemo(() => (ascending ? 'Place numbers in ascending order (start from 0)' : `Place numbers in descending order (start from ${length - 1})`), [ascending, length])

	const nextIndex = useMemo(() => {
		for (let i = 0; i < length; i++) {
			if (slots[i] === null && i !== 0) return i
		}
		return undefined
	}, [slots, length])

	const nextRequiredValue = useMemo(() => {
		if (nextIndex === undefined) return ascending ? 1 : Math.max(0, length - 2)
		return ascending ? nextIndex : length - 1 - nextIndex
	}, [nextIndex, ascending, length])

	function handleDropToCarriage(value: number, clientX: number, clientY: number) {
		if (nextIndex === undefined) return
		const rect = carriageRefs.current[nextIndex]?.getBoundingClientRect()
		if (!rect) return
		const inside = clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom
		const expectedValue = ascending ? nextIndex : length - 1 - nextIndex
		if (inside && value === expectedValue) {
			setSlots((prev) => {
				const next = [...prev]
				next[nextIndex] = value
				return next
			})
			setPool((p) => p.filter((n) => n !== value))
			setHighlightIdx(() => {
				for (let i = nextIndex + 1; i < length; i++) if (slots[i] === null) return i
				return undefined
			})
			// do not move the train yet; it will glide only after completion
		} else {
			// wrong: lightly hint next target
			setHighlightIdx(nextIndex)
		}
	}

	return (
		<div className="font-fun">
			<div className="rounded-3xl overflow-hidden shadow-bubble">
				<div className="p-4 md:p-6 bg-gradient-to-b from-sky-50 via-pink-50 to-yellow-50">
					<div className="flex items-center justify-between mb-3">
						<h2 className="text-2xl md:text-3xl font-extrabold text-green-700">Number Train Ride</h2>
						<div className="flex gap-2">
							<button className={`px-3 py-2 rounded-lg ${ascending ? 'bg-green-300' : 'bg-white'} shadow`} onClick={() => setAscending(true)}>
								Ascending
							</button>
							<button className={`px-3 py-2 rounded-lg ${!ascending ? 'bg-green-300' : 'bg-white'} shadow`} onClick={() => setAscending(false)}>
								Descending
							</button>
						</div>
					</div>
					<p className="mb-4 text-slate-700">{prompt}</p>
					<div ref={containerRef} className="relative w-full overflow-hidden">
						<motion.div
							ref={trainRef}
							animate={{ x: trainX }}
							transition={{ duration: (trainRef.current as any)?.__rideDuration ?? 0.6, ease: 'easeInOut' }}
							className="mb-4 inline-block"
						>
							<Train count={length} slots={slots} highlightIdx={highlightIdx} lockedIndices={new Set(slots.map((v, i) => v !== null ? i : -1).filter((i) => i >= 0))} setCarriageRef={setCarriageRef} />
						</motion.div>
					</div>
					<div className="grid grid-cols-5 md:grid-cols-10 gap-2">
						{pool.map((n, i) => (
							<motion.div
								key={n + '-' + i}
								drag
								dragSnapToOrigin
								onDragEnd={(_, info) => handleDropToCarriage(n, info.point.x, info.point.y)}
								className={`rounded-xl bg-white shadow-bubble border-2 ${n === nextRequiredValue ? 'border-green-500 ring-2 ring-green-300' : 'border-gray-200'} text-lg font-extrabold h-12 w-12 md:h-14 md:w-14 flex items-center justify-center select-none`}
							>
								{n}
							</motion.div>
						))}
					</div>
					{done && (
						<div className="mt-4 text-center font-bold text-green-700">Great job! The train rides forward! 🚂</div>
					)}
				</div>
			</div>
		</div>
	)
}
