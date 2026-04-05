import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const TreasureChest = forwardRef<HTMLDivElement, { open: boolean; onDrop: () => void }>(function TreasureChest({ open, onDrop }, ref) {
	return (
		<div className="relative">
			<motion.div
				ref={ref}
				className="h-56 rounded-3xl bg-yellow-50 border-4 border-yellow-200 flex items-center justify-center"
				onMouseUp={onDrop}
				aria-label="Treasure chest drop zone"
			>
				<img src={open ? '/assets/chest-open.svg' : '/assets/chest-closed.svg'} alt={open ? 'Chest open' : 'Chest closed'} className="w-48"/>
			</motion.div>
			{!open && (
				<motion.div className="absolute -top-3 right-4 text-yellow-400" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
					✨
				</motion.div>
			)}
			{open && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					{Array.from({ length: 8 }).map((_, i) => (
						<motion.span key={i} className="absolute text-yellow-300" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }} transition={{ duration: 1.2, delay: i * 0.05 }} style={{ transformOrigin: 'center', top: `${40 + (Math.sin(i) * 15)}%`, left: `${50 + (Math.cos(i) * 20)}%` }}>
							✦
						</motion.span>
					))}
				</div>
			)}
		</div>
	)
})

export default TreasureChest
