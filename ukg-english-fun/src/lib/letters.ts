export const LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))

export function pickTarget(): string {
	return LETTERS[Math.floor(Math.random() * LETTERS.length)]
}

export function makeOptions(target: string, count = 6): string[] {
	const pool = new Set<string>([target])
	while (pool.size < Math.min(Math.max(4, count), LETTERS.length)) {
		pool.add(pickTarget())
	}
	return Array.from(pool).sort(() => Math.random() - 0.5)
}

export function promptText(letter: string) {
	return `Find the letter ${letter}`
}
