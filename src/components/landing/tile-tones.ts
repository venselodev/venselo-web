/**
 * Tints for the headline KPI tiles of a dashboard, in order: violet, rose, gold.
 * Give the first three tiles of a row a tone and leave the rest plain.
 */
export const TILE_TONES = [
    "border-transparent bg-primary-soft text-primary-text",
    "border-transparent bg-rose-soft text-rose-text",
    "border-transparent bg-gold-soft text-gold-text",
] as const

export const tileTone = (index: number): string | undefined => TILE_TONES[index]
