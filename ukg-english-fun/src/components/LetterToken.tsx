import { motion } from 'framer-motion'

export default function LetterToken({ letter, onDragStart, onDragEnd, wobble, highlight }: {
	letter: string
	onDragStart: () => void
	onDragEnd: () => void
	wobble?: boolean
	highlight?: boolean
}) {
	return (
		<motion.div
			drag
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			className={`select-none w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white shadow-bubble flex items-center justify-center text-3xl cursor-grab border-4 ${highlight ? 'border-green-400' : 'border-transparent'}`}
			whileTap={{ scale: 1.1 }}
			animate={wobble ? { rotate: [0, -12, 12, -12, 0] } : { y: [0, -6, 0] }}
			transition={wobble ? { duration: 0.5 } : { repeat: Infinity, duration: 2 }}
			aria-label={`Letter ${letter} token`}
		>
			{letter}
		</motion.div>
	)
}
