import { getTranslations } from "next-intl/server"

import { SIGN_IN_URL } from "@/lib/site"
import { LanguageSwitch } from "./language-switch"
import { ThemeSwitch } from "./theme-switch"

const LINK = "text-[13px] text-muted-foreground transition-colors duration-100 hover:text-foreground"

export async function SiteFooter() {
    const t = await getTranslations("footer")
    const tn = await getTranslations("nav")

    return (
        <footer className="flex flex-wrap items-start gap-x-12 gap-y-8 border-t border-border px-5 py-8 sm:px-8">
            <div className="flex max-w-[260px] flex-col gap-2">
                <a href="#top" className="text-xl leading-none font-semibold tracking-[-0.03em] text-foreground">
                    venselo
                </a>
                <p className="text-[13px] leading-5 text-muted-foreground">{t("description")}</p>
            </div>
            <nav aria-label={t("product")} className="flex flex-col gap-2">
                <span className="label-mono">{t("product")}</span>
                <a href="#product" className={LINK}>
                    {t("features")}
                </a>
                <a href="#agencies" className={LINK}>
                    {tn("agencies")}
                </a>
                <a href="#pricing" className={LINK}>
                    {tn("pricing")}
                </a>
            </nav>
            <nav aria-label={t("help")} className="flex flex-col gap-2">
                <span className="label-mono">{t("help")}</span>
                <a href="#faq" className={LINK}>
                    {tn("faq")}
                </a>
                <a href="#contact" className={LINK}>
                    {tn("contact")}
                </a>
                <a href={SIGN_IN_URL} className={LINK}>
                    {tn("signIn")}
                </a>
            </nav>
            <div className="flex flex-col items-start gap-3 sm:ml-auto sm:items-end">
                <div className="flex gap-3">
                    <ThemeSwitch label={t("theme")} dark={t("dark")} light={t("light")} />
                    <LanguageSwitch label={tn("language")} />
                </div>
                <p className="text-[13px] text-muted-foreground">{t("rights", { year: new Date().getFullYear() })}</p>
            </div>
        </footer>
    )
}
