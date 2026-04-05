import { motion } from 'framer-motion'

export default function ParrotBuddy({ dancing }: { dancing: boolean }) {
	return (
		<div className="mt-2 flex items-center justify-center">
			<motion.img
				src="/assets/parrot.svg"
				alt="Pirate parrot"
				className="w-20"
				animate={dancing ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] } : {}}
				transition={dancing ? { duration: 0.8, repeat: Infinity } : {}}
			/>
		</div>
	)
}
