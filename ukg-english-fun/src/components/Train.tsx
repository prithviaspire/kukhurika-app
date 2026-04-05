import { motion } from 'framer-motion'

export function Train({
	count,
	slots,
	highlightIdx,
	lockedIndices,
	setCarriageRef,
}: {
	count: number
	slots: Array<number | null>
	highlightIdx?: number
	lockedIndices?: Set<number>
	setCarriageRef?: (el: HTMLDivElement | null, index: number) => void
}) {
	return (
		<div className="inline-block">
			<div className="flex items-end gap-3 min-w-[640px]">
				{Array.from({ length: count }).map((_, i) => (
					<div key={i} className={`flex flex-col items-center`}>
						<motion.div
							ref={(el) => setCarriageRef?.(el, i)}
							animate={highlightIdx === i ? { scale: [1, 1.05, 1] } : {}}
							transition={{ duration: 0.6, repeat: highlightIdx === i ? Infinity : 0 }}
							className={`w-24 h-16 rounded-xl ${highlightIdx === i ? 'bg-yellow-200' : 'bg-white'} shadow-bubble border-2 ${lockedIndices?.has(i) ? 'border-green-500' : 'border-gray-300'} flex items-center justify-center font-extrabold text-xl`}
						>
							{slots[i] !== null ? slots[i] : ''}
						</motion.div>
						<div className="w-24 h-2 bg-gray-500 mt-1" />
						<div className="flex gap-6">
							<div className="w-6 h-6 rounded-full bg-gray-700" />
							<div className="w-6 h-6 rounded-full bg-gray-700" />
						</div>
					</div>
				))}
				<div className="flex flex-col items-center">
					<div className="w-28 h-20 rounded-xl bg-green-400 shadow-bubble border-2 border-green-600 flex items-center justify-center font-extrabold">🚂</div>
					<div className="w-28 h-2 bg-gray-600 mt-1" />
					<div className="flex gap-6">
						<div className="w-6 h-6 rounded-full bg-gray-800" />
						<div className="w-6 h-6 rounded-full bg-gray-800" />
					</div>
				</div>
			</div>
		</div>
	)
}
