import { getTranslations } from "next-intl/server"

import { Button } from "@/components/ui/button"
import { SIGN_UP_URL } from "@/lib/site"
import { cn } from "@/lib/utils"
import { GRID, LEDE, TEXT_LINK } from "./grid"

export async function ClosingCta() {
    const t = await getTranslations("closing")
    const tc = await getTranslations("cta")

    return (
        <section aria-labelledby="closing-title" className={cn(GRID, "gap-y-7 border-t border-border py-[88px]")}>
            <div className="col-span-12 flex flex-col gap-4 lg:col-span-8">
                <h2
                    id="closing-title"
                    className="max-w-[14em] text-[clamp(34px,4.4vw,60px)] leading-[1.02] font-semibold tracking-[-0.03em]"
                >
                    {t("title")}
                </h2>
                <p className={LEDE}>{t("lede")}</p>
            </div>
            <div className="col-span-12 flex flex-wrap items-center gap-5 self-end lg:col-span-4 lg:col-start-9">
                <Button asChild size="lg">
                    <a href={SIGN_UP_URL}>{tc("start")}</a>
                </Button>
                <a href="#pricing" className={TEXT_LINK}>
                    {tc("pricing")}
                </a>
            </div>
        </section>
    )
}
