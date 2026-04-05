import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import SkyBackground from '../components/SkyBackground'
import ConfettiBurst from '../components/ConfettiBurst'
import { useRewards } from '../state/RewardsContext'
import { useSound } from '../hooks/useSound'
import HomeLink from '../components/HomeLink'

type NepaliItem = {
  id: string
  word: string
  label: string
  image: string
  fallback: string
}

const nepaliItems: NepaliItem[] = [
  {
    id: 'kamal',
    word: 'कमल',
    label: 'lotus',
    image: '/assets/lotus.jpg',
    fallback: '/assets/lotus.svg'
  },
  {
    id: 'kharayo',
    word: 'खरायो',
    label: 'rabbit',
    image: '/assets/rabbit.jpg',
    fallback: '/assets/rabbit.svg'
  },
  {
    id: 'gamala',
    word: 'गमला',
    label: 'flower pot',
    image: '/assets/flower pot.jpg',
    fallback: '/assets/flower.svg'
  },
  {
    id: 'ghoda',
    word: 'घोडा',
    label: 'horse',
    image: '/assets/horse.jpg',
    fallback: '/assets/horse.svg'
  },
  {
    id: 'chara',
    word: 'चरा',
    label: 'bird',
    image: '/assets/bird.jpg',
    fallback: '/assets/bird.svg'
  }
]

type DraggableItem = {
  id: string
  type: 'word' | 'image'
  content: NepaliItem
  isMatched: boolean
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function NepaliAlphabetMatch() {
  const { addStars, unlockSticker } = useRewards()
  const { play } = useSound({ cheer: '/sfx/cheer.mp3' })
  const [draggableItems, setDraggableItems] = useState<DraggableItem[]>([])
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({})
  const [correctCount, setCorrectCount] = useState(0)
  const [showReward, setShowReward] = useState(false)
  const [draggedItem, setDraggedItem] = useState<DraggableItem | null>(null)
  const [matchConfettiKey, setMatchConfettiKey] = useState(0)
  const [matched, setMatched] = useState<NepaliItem[]>([])
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    initializeGame()
  }, [])

  useEffect(() => {
    if (correctCount >= nepaliItems.length && !showReward) {
      setShowReward(true)
      addStars(10)
      unlockSticker('Nepali Matching Master')
    }
  }, [correctCount, showReward, addStars, unlockSticker])

  function initializeGame() {
    const words = nepaliItems.map(item => ({
      id: `word-${item.id}`,
      type: 'word' as const,
      content: item,
      isMatched: false
    }))
    const images = nepaliItems.map(item => ({
      id: `image-${item.id}`,
      type: 'image' as const,
      content: item,
      isMatched: false
    }))
    setDraggableItems([...shuffle(words), ...shuffle(images)])
    setMatchedPairs({})
    setMatched([])
    setCorrectCount(0)
    setShowReward(false)
    setMatchConfettiKey(0)
    cardRefs.current = {}
  }

  function handleDragStart(item: DraggableItem) {
    if (item.isMatched) return
    setDraggedItem(item)
  }

  function handleDragEnd(item: DraggableItem, _e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const targetId = getCardIdAt(info.point.x, info.point.y)
    if (!targetId) {
      setDraggedItem(null)
      return
    }
    const targetItem = draggableItems.find(i => i.id === targetId) || null
    if (!targetItem) {
      setDraggedItem(null)
      return
    }
    if (canDrop(targetItem, item)) {
      // Mark both matched and remove from board
      setDraggableItems(prev => prev.filter(i => i.content.id !== item.content.id))
      setMatched(prev => [...prev, item.content])
      setMatchedPairs(prev => ({ ...prev, [item.content.id]: `${item.id}-${targetItem.id}` }))
      setCorrectCount(prev => prev + 1)
      play('cheer')
      setMatchConfettiKey(k => k + 1)
    }
    setDraggedItem(null)
  }

  function canDrop(targetItem: DraggableItem, dragged: DraggableItem) {
    if (targetItem.isMatched || dragged.isMatched) return false
    if (targetItem.id === dragged.id) return false
    if (targetItem.type === dragged.type) return false
    return targetItem.content.id === dragged.content.id
  }

  function getCardIdAt(x: number, y: number): string | null {
    for (const [id, el] of Object.entries(cardRefs.current)) {
      if (!el) continue
      const rect = el.getBoundingClientRect()
      const inside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
      if (inside) return id
    }
    return null
  }

  function getZigZagLayout() {
    const words = draggableItems.filter(item => item.type === 'word')
    const images = draggableItems.filter(item => item.type === 'image')
    const layout: (DraggableItem | null)[][] = []
    for (let i = 0; i < Math.max(words.length, images.length); i++) {
      const row: (DraggableItem | null)[] = []
      if (i % 2 === 0) {
        row.push(words[i] || null)
        row.push(images[i] || null)
      } else {
        row.push(images[i] || null)
        row.push(words[i] || null)
      }
      layout.push(row)
    }
    return layout
  }

  function getSortedMatched() {
    const order = new Map(nepaliItems.map((it, idx) => [it.id, idx]))
    return [...matched].sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0))
  }

  return (
    <div className="font-fun">
      <div className="rounded-3xl overflow-hidden shadow-bubble">
        <SkyBackground />
        <div className="relative p-3 md:p-4 bg-gradient-to-b from-green-50 via-yellow-50 to-orange-50">
          <HomeLink />
          {/* Per-match confetti overlay */}
          {matchConfettiKey > 0 && (
            <div className="pointer-events-none absolute inset-0">
              <ConfettiBurst key={matchConfettiKey} spread={70} particleCount={180} />
            </div>
          )}

          <h2 className="text-2xl md:text-3xl font-extrabold text-green-700 mb-3 text-center">Nepali Word & Image Match</h2>
          <p className="mb-3 text-slate-700 text-center">Drag words and pictures to their match. Matched pairs appear on the right.</p>

          {/* Game Layout */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: board with words and images */}
            <div>
              {getZigZagLayout().map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-4 mb-4 justify-center">
                  {row.map((item, colIndex) => (
                    <div key={`${rowIndex}-${colIndex}`} className="w-32 h-32">
                      {item ? (
                        <motion.div
                          drag={!item.isMatched}
                          dragSnapToOrigin={!item.isMatched}
                          whileDrag={{ scale: 1.05, zIndex: 10 }}
                          onDragStart={() => handleDragStart(item)}
                          onDragEnd={(e, info) => handleDragEnd(item, e as any, info)}
                          ref={el => { cardRefs.current[item.id] = el }}
                          className={`relative h-full ${item.isMatched ? 'opacity-60 cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
                        >
                          {item.type === 'word' ? (
                            <div className="h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-2 text-center shadow-lg border-2 border-blue-300 flex flex-col justify-center">
                              <div className="text-xl font-bold text-white mb-1 leading-tight">{item.content.word}</div>
                              <div className="text-[10px] text-blue-100 leading-tight">{item.content.label}</div>
                            </div>
                          ) : (
                            <div className="h-full bg-white rounded-lg p-1.5 shadow-lg border-2 border-green-300 flex flex-col">
                              <div className="flex-1 rounded-md overflow-hidden mb-1">
                                <img
                                  src={item.content.image}
                                  alt={item.content.label}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                  onError={(e) => {
                                    const t = e.currentTarget as HTMLImageElement
                                    if (item.content.fallback && t.src !== window.location.origin + item.content.fallback) {
                                      t.src = item.content.fallback
                                    }
                                  }}
                                />
                              </div>
                              <div className="text-center">
                                <div className="text-[10px] font-semibold text-gray-700 leading-tight">{item.content.word}</div>
                                <div className="text-[10px] text-gray-500 leading-tight">{item.content.label}</div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ) : (
                        <div className="w-32 h-32" />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Right: matched pairs grid */}
            <div>
              <h3 className="text-center text-green-700 font-bold mb-2">Matched</h3>
              <div className="space-y-3">
                {nepaliItems.map((it) => {
                  const isDone = matched.some(m => m.id === it.id)
                  return (
                    <div
                      key={it.id}
                      className={`rounded-2xl border-4 ${isDone ? 'border-green-300' : 'border-green-200'} bg-white shadow-bubble p-3 min-h-24 flex items-center gap-3`}
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border-2 border-green-200 flex items-center justify-center">
                        <img
                          src={it.image}
                          alt={it.label}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          onError={(e) => {
                            const t = e.currentTarget as HTMLImageElement
                            if (it.fallback && t.src !== window.location.origin + it.fallback) {
                              t.src = it.fallback
                            }
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-green-700 text-sm leading-tight truncate">{it.word}</div>
                        <div className="text-[11px] text-slate-600 leading-tight truncate">{it.label}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Progress and Instructions */}
          <div className="text-center mt-4">
            <div className="text-sm font-bold text-green-700 mb-2">Progress: {correctCount} / {nepaliItems.length} matches</div>
            <div className="w-40 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-green-400 to-green-600" initial={{ width: 0 }} animate={{ width: `${(correctCount / nepaliItems.length) * 100}%` }} transition={{ duration: 0.5 }} />
            </div>
          </div>

          {/* Reward */}
          {showReward && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mt-5 text-center">
              <ConfettiBurst />
              <div className="text-2xl md:text-3xl font-extrabold text-orange-600 drop-shadow-sm">🎉 Perfect Match! 🎉</div>
              <div className="text-base text-slate-700 mt-2">You've mastered all Nepali word-image pairs!</div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
