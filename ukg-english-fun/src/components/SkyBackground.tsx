import { motion } from 'framer-motion'

export default function SkyBackground() {
	return (
		<div className="relative w-full h-48 md:h-64 overflow-hidden bg-gradient-to-b from-sky-200 to-sky-100">
			<motion.div className="absolute -left-32 top-6 w-40 h-16 rounded-full bg-white/80 blur-[1px]" animate={{ x: ['0%', '140%'] }} transition={{ repeat: Infinity, duration: 18, ease: 'linear' }} />
			<motion.div className="absolute -left-32 top-16 w-56 h-20 rounded-full bg-white/80 blur-[1px]" animate={{ x: ['0%', '140%'] }} transition={{ repeat: Infinity, duration: 24, ease: 'linear', delay: 3 }} />
			<motion.div className="absolute -left-32 top-2 w-28 h-12 rounded-full bg-white/80 blur-[1px]" animate={{ x: ['0%', '140%'] }} transition={{ repeat: Infinity, duration: 20, ease: 'linear', delay: 6 }} />
		</div>
	)
}
