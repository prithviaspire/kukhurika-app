import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import SkyBackground from '../components/SkyBackground'
import { useRewards } from '../state/RewardsContext'
import { useSound } from '../hooks/useSound'
import ConfettiBurst from '../components/ConfettiBurst'
import HomeLink from '../components/HomeLink'

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')
const COLOR_GRADIENTS = [
	'from-pink-300 to-pink-500',
	'from-yellow-300 to-yellow-500',
	'from-sky-300 to-sky-500',
	'from-green-300 to-green-500',
	'from-purple-300 to-purple-500',
	'from-orange-300 to-orange-500',
	'from-teal-300 to-teal-500',
	'from-red-300 to-red-500',
]

function pickTarget() {
	return LETTERS[Math.floor(Math.random() * LETTERS.length)]
}

function phonemeFor(letter: string) {
	const map: Record<string, string> = {
		s: 'sss', m: 'mmm', n: 'nnn', f: 'fff', v: 'vvv', z: 'zzz', r: 'rrr', l: 'lll',
		b: 'buh', c: 'kuh', d: 'duh', g: 'guh', h: 'huh', j: 'juh', k: 'kuh', p: 'puh', t: 'tuh', w: 'wuh', y: 'yuh',
		a: 'a', e: 'eh', i: 'ih', o: 'o', u: 'uh'
	}
	return map[letter] ?? letter
}

export default function PhonicsPopBubbles() {
	const { addStars, unlockSticker } = useRewards()
	const { play } = useSound({ pop: '/sfx/pop.mp3', boing: '/sfx/boing.mp3' })
	const [correctCount, setCorrectCount] = useState(0)
	const [target, setTarget] = useState<string>(pickTarget())
	const [wobbleId, setWobbleId] = useState<number | null>(null)
	const [popId, setPopId] = useState<number | null>(null)
	const [bigConfetti, setBigConfetti] = useState(false)

	const bubbleCount = useMemo(() => Math.min(4 + Math.floor(correctCount / 2), 8), [correctCount])
	const bubbles = useMemo(() => {
		if (target === 'f') {
			return ['f', 'a', 'v']
		}
		const picks = new Set<string>([target])
		while (picks.size < bubbleCount) picks.add(LETTERS[Math.floor(Math.random() * LETTERS.length)])
		const list = Array.from(picks).sort(() => Math.random() - 0.5)
		if (!list.includes(target)) list[0] = target
		return list
	}, [target, bubbleCount])

	useEffect(() => {
		// Speech synthesis disabled - do nothing
		return
	}, [target])

	function nextRound() {
		setTarget(pickTarget())
	}

	function choose(letter: string, idx: number) {
		if (letter === target) {
			setPopId(idx)
			play('pop')
			// Speech synthesis disabled - do nothing
			addStars(1)
			unlockSticker(`Balloon ${target.toUpperCase()}`)
			setCorrectCount((c) => c + 1)
			setBigConfetti(true)
			setTimeout(() => setBigConfetti(false), 600)
			setTimeout(() => {
				setPopId(null)
				nextRound()
			}, 900)
		} else {
			play('boing')
			setWobbleId(idx)
			setTimeout(() => setWobbleId(null), 500)
		}
	}

	return (
		<div className="font-fun">
			<div className="rounded-3xl overflow-hidden shadow-bubble">
				<SkyBackground />
				<div className="p-4 md:p-6 bg-gradient-to-b from-sky-50 via-pink-50 to-yellow-50 relative">
					<HomeLink />
					<div className="flex items-center justify-between mb-3">
						<h2 className="text-2xl md:text-3xl font-extrabold text-sky-700">Pop the balloon with the alphabet that looks like:</h2>
					</div>
					<p className="mb-4 text-xl md:text-2xl">
						<span className="ml-0 align-middle text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-sky-500">
							{target.toUpperCase()}
						</span>
					</p>
					<div className="relative h-[420px] rounded-3xl bg-gradient-to-t from-sky-100 via-white to-sky-100 overflow-hidden">
						{bubbles.map((b, idx) => (
							<div key={b + idx} className="absolute" style={{ left: `${8 + (idx * (84 / Math.max(1, bubbles.length - 1)))}%`, bottom: `${Math.random() * 10}%` }}>
								<motion.button
									className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${COLOR_GRADIENTS[idx % COLOR_GRADIENTS.length]} shadow-bubble text-2xl border-4 ${b === target ? 'border-green-300' : 'border-white/50'}`}
									onClick={() => choose(b, idx)}
									animate={popId === idx ? { scale: [1, 1.2, 0], opacity: [1, 1, 0] } : (wobbleId === idx ? { rotate: [0, -10, 10, -10, 0] } : { y: [-10, -380] })}
									transition={popId === idx ? { duration: 0.4 } : (wobbleId === idx ? { duration: 0.5 } : { repeat: Infinity, duration: 6 + (idx % 3), ease: 'linear' })}
								>
									{b.toUpperCase()}
									<span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-5 w-[2px] h-6 bg-gray-300 rounded-full"/>
								</motion.button>
							</div>
						))}
						{bigConfetti && (
							<div className="pointer-events-none absolute inset-0">
								<ConfettiBurst spread={80} particleCount={220} />
								<ConfettiBurst spread={70} particleCount={180} />
							</div>
						)}
					</div>
					<div className="mt-3 text-sm text-slate-700">Score: <span className="font-bold">{correctCount}</span></div>
				</div>
			</div>
		</div>
	)
}
