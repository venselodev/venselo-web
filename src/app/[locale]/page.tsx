import { setRequestLocale } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { SiteHeader } from "@/components/landing/site-header"
import { Hero } from "@/components/landing/hero"
import { AlertTimeline } from "@/components/landing/alert-timeline"
import { Facts } from "@/components/landing/facts"
import { Product } from "@/components/landing/product"
import { Agencies } from "@/components/landing/agencies"
import { Pricing } from "@/components/landing/pricing"
import { Faq } from "@/components/landing/faq"
import { Contact } from "@/components/landing/contact"
import { ClosingCta } from "@/components/landing/closing-cta"
import { SiteFooter } from "@/components/landing/site-footer"

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)
    const l = locale as Locale

    return (
        <div className="mx-auto max-w-[1280px] border-x border-border">
            <SiteHeader />
            <main id="top">
                <Hero locale={l} />
                <AlertTimeline />
                <Facts />
                <Product locale={l} />
                <Agencies />
                <Pricing />
                <Faq />
                <Contact />
                <ClosingCta />
            </main>
            <SiteFooter />
        </div>
    )
}
