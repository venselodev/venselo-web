import { getTranslations } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { TRIAL_DAYS } from "@/constants/pricing"
import { SIGN_UP_URL } from "@/lib/site"
import { cn } from "@/lib/utils"
import { GRID, H1, LEDE, MAIN, RAIL, TEXT_LINK } from "./grid"
import { Screenshot } from "./screenshot"

export async function Hero({ locale }: { locale: Locale }) {
    const t = await getTranslations("hero")
    const tc = await getTranslations("cta")
    const ts = await getTranslations("shots")

    return (
        <>
            <section aria-labelledby="hero-title" className={cn(GRID, "gap-y-6 pt-12 pb-14 sm:pt-20")}>
                <p className={cn(RAIL, "label-mono lg:pt-3.5")}>{t("label")}</p>
                <div className={cn(MAIN, "flex flex-col gap-7")}>
                    <h1 id="hero-title" className={cn(H1, "max-w-[12em]")}>
                        {t("title")}
                    </h1>
                    <p className={LEDE}>{t("lede")}</p>
                    <div className="flex flex-wrap items-center gap-5">
                        <Button asChild size="lg">
                            <a href={SIGN_UP_URL}>{tc("start")}</a>
                        </Button>
                        <a href="#pricing" className={TEXT_LINK}>
                            {tc("pricing")}
                        </a>
                        <span className="text-[13px] leading-[18px] text-muted-foreground">
                            {t("note", { days: TRIAL_DAYS })}
                        </span>
                    </div>
                </div>
            </section>
            <div className="px-5 pb-14 sm:px-8">
                <Screenshot
                    locale={locale}
                    name="sales"
                    alt={ts("alt.sales")}
                    caption={ts("caption.sales")}
                    note={ts("fromApp")}
                    sizes="(min-width: 1280px) 1216px, 100vw"
                    priority
                />
            </div>
        </>
    )
}
