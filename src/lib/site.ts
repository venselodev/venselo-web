const trimSlash = (url: string) => url.replace(/\/+$/, "")

/** Public URL of this marketing site (canonical links, sitemap, Open Graph). */
export const SITE_URL = trimSlash(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3004")

/** The Venselo app (webcore). */
export const APP_URL = trimSlash(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3003")

export const SIGN_UP_URL = `${APP_URL}/sign-up`
export const SIGN_IN_URL = `${APP_URL}/sign-in`

/** Booking link for demos (Calendly, Cal.com…). Without it, "Book a demo" scrolls to the contact form. */
export const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL || null
