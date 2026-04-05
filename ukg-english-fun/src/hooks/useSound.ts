import { useCallback, useEffect, useMemo, useState } from 'react'

export type SoundMap = {
	[key: string]: string
}

let audioCtx: AudioContext | null = null
function ensureCtx() {
	if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
	return audioCtx!
}

function env(g: GainNode, duration: number, peak = 0.6) {
	const now = ensureCtx().currentTime
	g.gain.cancelScheduledValues(now)
	g.gain.setValueAtTime(0, now)
	g.gain.linearRampToValueAtTime(peak, now + 0.02)
	g.gain.exponentialRampToValueAtTime(0.001, now + duration)
}

function tone(freq: number, type: OscillatorType, duration: number, gain = 0.6) {
	const ctx = ensureCtx()
	const o = ctx.createOscillator()
	const g = ctx.createGain()
	o.type = type
	o.frequency.value = freq
	o.connect(g)
	g.connect(ctx.destination)
	env(g, duration, gain)
	o.start()
	o.stop(ctx.currentTime + duration)
}

function glide(start: number, end: number, duration: number, type: OscillatorType = 'sine', gain = 0.6) {
	const ctx = ensureCtx()
	const o = ctx.createOscillator()
	const g = ctx.createGain()
	o.type = type
	o.frequency.setValueAtTime(start, ctx.currentTime)
	o.frequency.exponentialRampToValueAtTime(end, ctx.currentTime + duration)
	o.connect(g)
	g.connect(ctx.destination)
	env(g, duration, gain)
	o.start()
	o.stop(ctx.currentTime + duration)
}

function fallbackSynth(key: string) {
	try {
		if (key === 'cheer') {
			tone(660, 'triangle', 0.18, 0.5)
			setTimeout(() => tone(880, 'sine', 0.18, 0.5), 130)
			setTimeout(() => tone(990, 'sine', 0.22, 0.5), 260)
			return
		}
		if (key === 'boing') {
			glide(320, 120, 0.45, 'sine', 0.6)
			return
		}
		if (key === 'pop') {
			tone(1400, 'square', 0.12, 0.6)
			return
		}
		if (key === 'chest') {
			tone(220, 'sawtooth', 0.2, 0.4)
			setTimeout(() => tone(330, 'sawtooth', 0.2, 0.4), 20)
			return
		}
		if (key === 'train') {
			glide(120, 150, 0.6, 'sawtooth', 0.3)
			return
		}
	} catch {}
}

export function useSound(map: SoundMap) {
	const [soundOn, setSoundOn] = useState<boolean>(() => {
		try {
			const v = localStorage.getItem('soundOn')
			return v === null ? true : v === 'true'
		} catch {
			return true
		}
	})

	useEffect(() => {
		try { localStorage.setItem('soundOn', String(soundOn)) } catch {}
	}, [soundOn])

	const audios = useMemo(() => {
		const entries = Object.entries(map)
		return entries.reduce<Record<string, HTMLAudioElement>>((acc, [k, src]) => {
			const audio = new Audio(src)
			audio.preload = 'auto'
			acc[k] = audio
			return acc
		}, {})
	}, [map])

	const play = useCallback((key: string) => {
		if (!soundOn) return
		const a = audios[key]
		if (!a) {
			fallbackSynth(key)
			return
		}
		try {
			a.currentTime = 0
			const p = a.play()
			if (p && typeof p.then === 'function') {
				p.catch(() => fallbackSynth(key))
			}
		} catch {
			fallbackSynth(key)
		}
	}, [audios, soundOn])

	const stop = useCallback((key: string) => {
		const a = audios[key]
		if (!a) return
		try {
			a.pause()
			a.currentTime = 0
		} catch {}
	}, [audios])

	return { play, stop, soundOn, setSoundOn }
}
