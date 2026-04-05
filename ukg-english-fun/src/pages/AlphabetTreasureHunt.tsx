import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import StarsCounter from '../components/StarsCounter'
import LetterToken from '../components/LetterToken'
import TreasureChest from '../components/TreasureChest'
import ParrotGuide from '../components/ParrotGuide'
import ConfettiBurst from '../components/ConfettiBurst'
import { useRewards } from '../state/RewardsContext'
import { useSound } from '../hooks/useSound'
import { makeOptions, pickTarget } from '../lib/letters'
import HomeLink from '../components/HomeLink'

export default function AlphabetTreasureHunt() {
	const navigate = useNavigate()
	const { addStars, unlockBadge } = useRewards()
	const chestRef = useRef<HTMLDivElement>(null)

	const [started, setStarted] = useState(false)
	const [target, setTarget] = useState<string>(pickTarget())
	const [options, setOptions] = useState<string[]>([])
	const [stars, setStars] = useState(0)
	const [celebrate, setCelebrate] = useState(false)
	const [wobbleLetter, setWobbleLetter] = useState<string | null>(null)
	const [highlightTarget, setHighlightTarget] = useState(false)
	const [parrotText, setParrotText] = useState('')
	const [victory, setVictory] = useState(false)

	const { play } = useSound({
		cheer: '/sfx/cheer.mp3',
		boing: '/sfx/boing.mp3',
		chest: '/sfx/chest.mp3',
	})

	useEffect(() => {
		setOptions(makeOptions(target, 6))
	}, [target])

	const speak = useCallback((text: string) => {
		// Speech synthesis disabled - do nothing
		return
	}, [])

	useEffect(() => {
		if (started) {
			const t = `Find the letter ${target}`
			setParrotText(t)
			speak(t)
		}
	}, [started, target, speak])

	function nextRound() {
		setTarget(pickTarget())
	}

	function handleDragEnd(letter: string, _e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
		const rect = chestRef.current?.getBoundingClientRect()
		if (!rect) return
		const x = info.point.x
		const y = info.point.y
		const inside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
		if (inside) {
			if (letter === target) {
				setCelebrate(true)
				play('chest')
				play('cheer')
				setStars((s) => s + 1)
				addStars(1)
				const newStars = stars + 1
				if (newStars === 5) unlockBadge('Little Pirate')
				if (newStars === 10) {
					unlockBadge('Letter Explorer')
					setTimeout(() => setVictory(true), 800)
				}
				setTimeout(() => {
					setCelebrate(false)
					if (newStars < 10) nextRound()
				}, 1200)
			} else {
				play('boing')
				setWobbleLetter(letter)
				setHighlightTarget(true)
				const t = `Try again! Find letter ${target}`
				setParrotText(t)
				speak(t)
				setTimeout(() => setWobbleLetter(null), 550)
				setTimeout(() => setHighlightTarget(false), 800)
			}
		}
	}

	function playAgain() {
		setStars(0)
		setVictory(false)
		nextRound()
		setStarted(true)
	}

	return (
		<div className="font-fun">
			<div className="rounded-3xl overflow-hidden shadow-bubble">
				<div className="relative">
					<img src="/assets/island-bg.svg" alt="Sunny island" className="w-full h-48 md:h-64 object-cover"/>
					<div className="absolute inset-0 p-3 flex items-start justify-between">
						<StarsCounter stars={stars} />
						<ParrotGuide dancing={celebrate} text={parrotText} />
					</div>
				</div>
				<div className="p-4 md:p-6 bg-gradient-to-b from-sky-50 via-pink-50 to-yellow-50">
					<HomeLink />
					<AnimatePresence mode="wait">
						{!started ? (
							<motion.div key="start" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-center">
								<h2 className="text-3xl font-extrabold text-sky-700 mb-2">Alphabet Treasure Hunt</h2>
								<p className="mb-4">Drag the right letter into the treasure chest!</p>
								<button onClick={() => setStarted(true)} className="px-8 py-4 rounded-2xl bg-sunshineYellow text-forestGreen font-bold shadow-bubble hover:scale-105 transition">
									Start Game
								</button>
							</motion.div>
						) : (
							<motion.div key="game" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
								<p className="text-slate-700 mb-4">Find the letter <span className="font-bold">{target}</span></p>
								<div className="grid md:grid-cols-2 gap-6 items-start">
									<div className="grid grid-cols-3 gap-3">
										{options.map((l) => (
											<motion.div key={l} drag dragSnapToOrigin onDragEnd={(e, info) => handleDragEnd(l, e, info)}>
												<LetterToken letter={l} onDragStart={() => {}} onDragEnd={() => {}} wobble={wobbleLetter === l} highlight={highlightTarget && l === target} />
											</motion.div>
										))}
									</div>
									<div>
										<TreasureChest ref={chestRef} open={celebrate} onDrop={() => {}} />
										<AnimatePresence>
											{celebrate && (
												<motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="mt-3 p-3 rounded-2xl bg-green-100 text-green-800 font-bold flex items-center gap-2">
													<span>Great job!</span>
													<ConfettiBurst />
												</motion.div>
											)}
										</AnimatePresence>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
					<AnimatePresence>
						{victory && (
							<motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
								<motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="max-w-md w-full rounded-3xl bg-white p-6 text-center shadow-bubble">
									<img src="/assets/chest-open.svg" alt="Treasure!" className="w-36 mx-auto mb-3"/>
									<h3 className="text-2xl font-extrabold text-forestGreen mb-2">Letter Explorer!</h3>
									<p className="mb-4">You found 10 letters. Amazing!</p>
									<ConfettiBurst />
									<div className="flex gap-3 justify-center mt-2">
										<button onClick={playAgain} className="px-5 py-3 rounded-2xl bg-sunshineYellow text-forestGreen font-bold shadow">Play Again</button>
										<button onClick={() => navigate('/english')} className="px-5 py-3 rounded-2xl bg-pink-200 text-pink-900 font-bold shadow">Back to English</button>
									</div>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	)
}
