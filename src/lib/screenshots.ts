import type { Locale } from "@/i18n/routing"

export type ScreenshotName = "sales" | "overview" | "alerts" | "leads" | "import"
export type Theme = "dark" | "light"

const SIZES: Record<Locale, Record<ScreenshotName, { width: number; height: number }>> = {
    en: {
        sales: { width: 1440, height: 445 },
        overview: { width: 1120, height: 348 },
        alerts: { width: 1360, height: 500 },
        leads: { width: 824, height: 350 },
        import: { width: 600, height: 325 },
    },
    es: {
        sales: { width: 1440, height: 352 },
        overview: { width: 1120, height: 348 },
        alerts: { width: 1360, height: 500 },
        leads: { width: 824, height: 250 },
        import: { width: 600, height: 325 },
    },
}

// Captures that exist in public/screenshots. Missing ones fall back below: Spanish has no light captures
// yet and no alerts calendar, so those use the Spanish dark capture or the English calendar.
const AVAILABLE = new Set([
    "en/sales-dark",
    "en/sales-light",
    "en/overview-dark",
    "en/overview-light",
    "en/alerts-dark",
    "en/alerts-light",
    "en/leads-dark",
    "en/leads-light",
    "en/import-dark",
    "en/import-light",
    "es/sales-dark",
    "es/overview-dark",
    "es/leads-dark",
    "es/import-dark",
])

export function screenshot(locale: Locale, name: ScreenshotName, theme: Theme) {
    const candidates: [Locale, Theme][] = [
        [locale, theme],
        [locale, "dark"],
        ["en", theme],
        ["en", "dark"],
    ]
    const [l, t] = candidates.find(([l, t]) => AVAILABLE.has(`${l}/${name}-${t}`)) ?? ["en", "dark"]
    return { src: `/screenshots/${l}/${name}-${t}.png`, ...SIZES[l][name] }
}
