let audioCtx: AudioContext | null = null

function ensureCtx() {
	if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
	return audioCtx!
}

function envelope(gain: GainNode, duration = 0.3) {
	const now = ensureCtx().currentTime

	gain.gain.exponentialRampToValueAtTime(0.001, now + duration)
}

export function playCheer() {
	// Sound disabled - do nothing
	return
}

export function playPop() {
	// Sound disabled - do nothing
	return
}

export function playBoing() {
	// Sound disabled - do nothing
	return
}
