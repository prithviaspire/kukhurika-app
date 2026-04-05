import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SkyBackground from '../components/SkyBackground'
import ConfettiBurst from '../components/ConfettiBurst'
import { useRewards } from '../state/RewardsContext'
import HomeLink from '../components/HomeLink'
import { useSound } from '../hooks/useSound'

type Item = {
  id: string
  name: string
  img?: string
  fallback?: string
  kind: 'living' | 'nonliving'
}

const allItems: Item[] = [
  {
    id: 'bird',
    name: 'Bird',
    img: 'https://images.unsplash.com/photo-1501706362039-c06b2d715385?auto=format&fit=crop&w=256&q=80',
    fallback: '/assets/bird.svg',
    kind: 'living',
  },
  {
    id: 'flower',
    name: 'Flower',
    img: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=256&q=80',
    fallback: '/assets/flower.svg',
    kind: 'living',
  },
  {
    id: 'tree',
    name: 'Tree',
    img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=256&q=80',
    fallback: '/assets/tree.svg',
    kind: 'living',
  },
  {
    id: 'car',
    name: 'Car',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=256&q=80',
    fallback: '/assets/car.svg',
    kind: 'nonliving',
  },
]

function shuffle<T>(a: T[]) {
  return [...a].sort(() => Math.random() - 0.5)
}

export default function LivingNonLivingSort() {
  const { addStars, unlockSticker } = useRewards()
  const { play } = useSound({ cheer: '/sfx/cheer.mp3', boing: '/sfx/boing.mp3' })
  const [round, setRound] = useState(1)
  const [pool, setPool] = useState<Item[]>([])
  const [placed, setPlaced] = useState<Record<string, 'living' | 'nonliving'>>({})
  const [done, setDone] = useState(false)
  const [showReward, setShowReward] = useState(false)

  const livingRef = useRef<HTMLDivElement | null>(null)
  const nonLivingRef = useRef<HTMLDivElement | null>(null)

  const targetCount = useMemo(() => Math.min(4 + (round - 1) * 2, allItems.length), [round])

  useEffect(() => {
    setPlaced({})
    setDone(false)
    setShowReward(false)
    setPool(shuffle(allItems).slice(0, targetCount))
  }, [round, targetCount])

  useEffect(() => {
    if (pool.length > 0 && Object.keys(placed).length === pool.length) {
      const correct = pool.every((it) => placed[it.id] === it.kind)
      if (correct) {
        setDone(true)
        setShowReward(true)
        addStars(2)
        unlockSticker('Living vs Non-Living Champ')
        
        // Play celebration sound
        play('cheer')
        
        // Show reward for 2 seconds, then advance to next round
        setTimeout(() => {
          setShowReward(false)
          setRound((r) => Math.min(r + 1, 4))
        }, 2000)
      }
    }
  }, [placed, pool, addStars, unlockSticker, play])

  function handleDrop(id: string, target: 'living' | 'nonliving') {
    const item = pool.find((p) => p.id === id)
    const isCorrect = item && item.kind === target
    setPlaced((prev) => ({ ...prev, [id]: target }))
    
    // Play sound feedback
    if (isCorrect) {
      play('cheer')
    } else {
      play('boing')
    }
    
    // glow feedback on correct drop
    const box = (target === 'living' ? livingRef.current : nonLivingRef.current)
    if (isCorrect && box) {
      box.classList.add('ring-4', 'ring-green-300')
      setTimeout(() => box.classList.remove('ring-4', 'ring-green-300'), 450)
    }
  }

  function isInsideTarget(x: number, y: number, target: 'living' | 'nonliving') {
    const rect = (target === 'living' ? livingRef.current : nonLivingRef.current)?.getBoundingClientRect()
    if (!rect) return false
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
  }

  return (
    <div className="font-fun">
      <div className="rounded-3xl overflow-hidden shadow-bubble">
        <SkyBackground />
        <div className="relative p-4 md:p-6 bg-gradient-to-b from-sky-50 via-green-50 to-yellow-50">
          <HomeLink />
          <motion.div
            className="absolute top-4 right-6 w-10 h-10 rounded-full bg-yellow-300"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          />

          <h2 className="text-2xl md:text-3xl font-extrabold text-green-700 mb-2">Living vs Non-Living Sort</h2>
          <p className="mb-4 text-slate-700">Drag each picture into the correct box.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div
              ref={livingRef}
              className={`rounded-2xl border-4 ${done ? 'border-green-500' : 'border-green-300'} bg-white/80 shadow-bubble p-4 min-h-40`}
            >
              <h3 className="text-lg font-bold text-green-700 mb-2">Living</h3>
              <div className="flex flex-wrap gap-2 min-h-16">
                {pool.filter((it) => placed[it.id] === 'living').map((it) => (
                  <motion.div
                    key={it.id}
                    layoutId={it.id}
                    className="rounded-xl bg-green-100 shadow p-1"
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  >
                    {it.img ? (
                      <img
                        src={it.img}
                        alt={it.name}
                        className="h-16 w-16 object-contain rounded-lg shadow-sm"
                        loading="lazy"
                        onError={(e) => {
                          const t = e.currentTarget as HTMLImageElement
                          if (it.fallback && t.src !== window.location.origin + it.fallback) t.src = it.fallback
                        }}
                      />
                    ) : (
                      <div className="px-3 py-2 font-bold text-green-800">{it.name}</div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            <div
              ref={nonLivingRef}
              className={`rounded-2xl border-4 ${done ? 'border-green-500' : 'border-blue-300'} bg-white/80 shadow-bubble p-4 min-h-40`}
            >
              <h3 className="text-lg font-bold text-blue-700 mb-2">Non-Living</h3>
              <div className="flex flex-wrap gap-2 min-h-16">
                {pool.filter((it) => placed[it.id] === 'nonliving').map((it) => (
                  <motion.div
                    key={it.id}
                    layoutId={it.id}
                    className="rounded-xl bg-blue-100 shadow p-1"
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  >
                    {it.img ? (
                      <img
                        src={it.img}
                        alt={it.name}
                        className="h-16 w-16 object-contain rounded-lg shadow-sm"
                        loading="lazy"
                        onError={(e) => {
                          const t = e.currentTarget as HTMLImageElement
                          if (it.fallback && t.src !== window.location.origin + it.fallback) t.src = it.fallback
                        }}
                      />
                    ) : (
                      <div className="px-3 py-2 font-bold text-blue-800">{it.name}</div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {pool.filter((it) => !placed[it.id]).map((it) => (
              <motion.div
                key={it.id}
                layoutId={it.id}
                drag
                dragSnapToOrigin
                whileDrag={{ scale: 1.08 }}
                onDragEnd={(_, info) => {
                  if (isInsideTarget(info.point.x, info.point.y, 'living')) handleDrop(it.id, 'living')
                  else if (isInsideTarget(info.point.x, info.point.y, 'nonliving')) handleDrop(it.id, 'nonliving')
                }}
                className="rounded-2xl bg-white shadow-bubble border-2 border-gray-200 text-lg font-extrabold h-28 flex items-center justify-center select-none touch-none cursor-grab active:cursor-grabbing"
              >
                {it.img ? (
                  <img
                    src={it.img}
                    alt={it.name}
                    className="h-24 w-24 object-cover rounded-xl shadow"
                    loading="lazy"
                    draggable={false}
                    onError={(e) => {
                      const t = e.currentTarget as HTMLImageElement
                      if (it.fallback && t.src !== window.location.origin + it.fallback) t.src = it.fallback
                    }}
                  />
                ) : (
                  it.name
                )}
              </motion.div>
            ))}
          </div>

          {showReward && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mt-6 text-center"
            >
              <ConfettiBurst spread={80} particleCount={220} />
              <ConfettiBurst spread={70} particleCount={180} />
              <div className="text-3xl md:text-4xl font-extrabold text-green-700 drop-shadow-sm">
                🎉 Well Done! Great Job! 🎉
              </div>
              <div className="text-lg text-slate-700 mt-2">
                You've sorted everything correctly!
              </div>
            </motion.div>
          )}

          {done && !showReward && (
            <div className="mt-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                ✅ All sorted! Moving to next round...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


