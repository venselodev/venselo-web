import { getTranslations } from "next-intl/server"

import { Button } from "@/components/ui/button"
import { DEMO_URL, SIGN_IN_URL, SIGN_UP_URL } from "@/lib/site"
import { LanguageSwitch } from "./language-switch"

const NAV = ["product", "agencies", "pricing", "faq", "contact"] as const

export async function SiteHeader() {
    const t = await getTranslations("nav")
    const tc = await getTranslations("cta")

    return (
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background px-5 sm:gap-8 sm:px-8">
            <a
                href="#top"
                aria-label={t("home")}
                className="text-xl leading-none font-semibold tracking-[-0.03em] text-foreground"
            >
                venselo
            </a>
            <nav aria-label={t("aria")} className="hidden gap-6 lg:flex">
                {NAV.map((key) => (
                    <a
                        key={key}
                        href={`#${key}`}
                        className="text-sm text-muted-foreground transition-colors duration-100 hover:text-foreground"
                    >
                        {t(key)}
                    </a>
                ))}
            </nav>
            <div className="ml-auto flex items-center gap-3 sm:gap-5">
                <LanguageSwitch label={t("language")} />
                <a
                    href={SIGN_IN_URL}
                    className="hidden text-sm text-muted-foreground transition-colors duration-100 hover:text-foreground sm:inline"
                >
                    {t("signIn")}
                </a>
                <Button asChild variant="outline" className="hidden md:inline-flex">
                    <a href={DEMO_URL ?? "#contact"}>{t("demo")}</a>
                </Button>
                <Button asChild variant="secondary" className="max-sm:h-10">
                    <a href={SIGN_UP_URL}>{tc("start")}</a>
                </Button>
            </div>
        </header>
    )
}
