import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
    locales: ["es", "en"],
    defaultLocale: "es",
    // Spanish lives at /, English at /en.
    localePrefix: "as-needed",
    // The URL decides the language; never redirect a visitor away from what they opened.
    localeDetection: false,
})

export type Locale = (typeof routing.locales)[number]
