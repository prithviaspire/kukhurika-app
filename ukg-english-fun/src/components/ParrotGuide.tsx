import { motion } from 'framer-motion'

export default function ParrotGuide({ dancing, text }: { dancing: boolean; text?: string }) {
	return (
		<div className="flex items-start gap-3">
			<motion.img
				src="/assets/parrot.svg"
				alt="Pirate parrot"
				className="w-16 md:w-20"
				animate={dancing ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] } : { y: [0, -4, 0] }}
				transition={dancing ? { duration: 0.8, repeat: Infinity } : { duration: 2, repeat: Infinity }}
			/>
			{text && (
				<div className="rounded-2xl bg-white/90 backdrop-blur px-3 py-2 shadow-bubble text-sm">
					{text}
				</div>
			)}
		</div>
	)
}
