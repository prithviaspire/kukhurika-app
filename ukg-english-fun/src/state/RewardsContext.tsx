import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type Rewards = {
	stars: number
	badges: string[]
	stickers: string[]
}

export type RewardsContextValue = Rewards & {
	addStars: (n: number) => void
	unlockBadge: (name: string) => void
	unlockSticker: (name: string) => void
	reset: () => void
}

const RewardsContext = createContext<RewardsContextValue | undefined>(undefined)

export function RewardsProvider({ children }: { children: ReactNode }) {
	const [stars, setStars] = useState(0)
	const [badges, setBadges] = useState<string[]>([])
	const [stickers, setStickers] = useState<string[]>([])

	const value = useMemo<RewardsContextValue>(() => ({
		stars,
		badges,
		stickers,
		addStars: (n: number) => setStars((s) => s + Math.max(0, n)),
		unlockBadge: (name: string) => setBadges((b) => (b.includes(name) ? b : [...b, name])),
		unlockSticker: (name: string) => setStickers((s) => (s.includes(name) ? s : [...s, name])),
		reset: () => {
			setStars(0)
			setBadges([])
			setStickers([])
		},
	}), [stars, badges, stickers])

	return <RewardsContext.Provider value={value}>{children}</RewardsContext.Provider>
}

export function useRewards() {
	const ctx = useContext(RewardsContext)
	if (!ctx) throw new Error('useRewards must be used within RewardsProvider')
	return ctx
}
