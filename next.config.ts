import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

const isDev = process.env.NODE_ENV !== "production"
// Only force HTTPS sub-requests when the site is served over HTTPS (keeps `pnpm start` usable on localhost).
const isHttps = (process.env.NEXT_PUBLIC_SITE_URL ?? "").startsWith("https://")

const csp = [
    "default-src 'self'",
    // 'unsafe-inline' covers the next-themes no-flash script; 'unsafe-eval' only for dev tooling.
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    ...(isHttps ? ["upgrade-insecure-requests"] : []),
].join("; ")

const nextConfig: NextConfig = {
    output: "standalone",
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "X-Frame-Options", value: "DENY" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
                    },
                    { key: "Content-Security-Policy", value: csp },
                ],
            },
        ]
    },
}

export default withNextIntl(nextConfig)
