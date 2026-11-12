import "../globals.css"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { routing } from "@/i18n/routing"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { SITE_URL } from "@/lib/site"

const fredoka = localFont({
    src: [
        { path: "../fonts/Fredoka-500.woff2", weight: "500", style: "normal" },
        { path: "../fonts/Fredoka-600.woff2", weight: "600", style: "normal" },
    ],
    variable: "--font-fredoka",
    display: "swap",
})

const inter = localFont({
    src: [
        { path: "../fonts/Inter-400.woff2", weight: "400", style: "normal" },
        { path: "../fonts/Inter-500.woff2", weight: "500", style: "normal" },
        { path: "../fonts/Inter-600.woff2", weight: "600", style: "normal" },
    ],
    variable: "--font-inter",
    display: "swap",
})

const geistMono = localFont({
    src: [
        { path: "../fonts/GeistMono-400.woff2", weight: "400", style: "normal" },
        { path: "../fonts/GeistMono-500.woff2", weight: "500", style: "normal" },
    ],
    variable: "--font-geist-mono",
    display: "swap",
})

type Props = {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "metadata" })
    const path = locale === routing.defaultLocale ? "/" : `/${locale}`

    return {
        metadataBase: new URL(SITE_URL),
        title: t("title"),
        description: t("description"),
        alternates: {
            canonical: path,
            languages: { es: "/", en: "/en", "x-default": "/" },
        },
        openGraph: {
            type: "website",
            siteName: "Venselo",
            url: path,
            title: t("title"),
            description: t("description"),
            locale: locale === "es" ? "es_419" : "en_US",
            images: [{ url: `/screenshots/${locale}/sales-dark.png` }],
        },
    }
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params
    if (!hasLocale(routing.locales, locale)) notFound()
    setRequestLocale(locale)

    return (
        <html
            lang={locale}
            suppressHydrationWarning
            className={`${fredoka.variable} ${inter.variable} ${geistMono.variable} antialiased`}
        >
            <body>
                <NextIntlClientProvider>
                    <ThemeProvider>
                        {children}
                        <Toaster />
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
