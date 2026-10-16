import { getTranslations } from "next-intl/server"

import type { Locale } from "@/i18n/routing"
import type { ScreenshotName } from "@/lib/screenshots"
import { cn } from "@/lib/utils"
import { BODY, GRID, H3, ITEM_TITLE, MAIN, RAIL } from "./grid"
import { Screenshot } from "./screenshot"
import { SectionHead } from "./section-head"

type Item = { title: string; body: string }

export async function Product({ locale }: { locale: Locale }) {
    const t = await getTranslations("product")
    const ts = await getTranslations("shots")
    const more = t.raw("more.items") as Item[]

    const shot = (name: ScreenshotName, sizes: string) => (
        <Screenshot locale={locale} name={name} alt={ts(`alt.${name}`)} caption={ts(`caption.${name}`)} sizes={sizes} />
    )

    const feature = (key: "overview" | "alerts", name: ScreenshotName) => (
        <div className={cn(GRID, "gap-y-7 border-t border-border pt-10 pb-14")}>
            <div className={cn(RAIL, "flex flex-col gap-3")}>
                <h3 className={H3}>{t(`${key}.title`)}</h3>
                <p className={BODY}>{t(`${key}.body`)}</p>
            </div>
            <div className={cn(MAIN, "flex flex-col gap-7")}>
                <ul className="grid gap-x-6 border-t border-border sm:grid-cols-2">
                    {(t.raw(`${key}.points`) as string[]).map((point) => (
                        <li key={point} className="border-b border-border py-2.5 text-sm leading-5">
                            {point}
                        </li>
                    ))}
                </ul>
                {shot(name, "(min-width: 1280px) 900px, (min-width: 1024px) 70vw, 100vw")}
            </div>
        </div>
    )

    return (
        <section id="product" aria-labelledby="product-title" className="border-t border-border">
            <SectionHead label={t("label")} title={t("title")} lede={t("lede")} titleId="product-title" />

            {feature("overview", "overview")}
            {feature("alerts", "alerts")}

            <div className="grid gap-px border-t border-border bg-border lg:grid-cols-2">
                {(["import", "leads"] as const).map((key) => (
                    <article key={key} className="flex min-w-0 flex-col gap-3.5 bg-background px-5 pt-10 pb-14 sm:px-8">
                        <h3 className={H3}>{t(`${key}.title`)}</h3>
                        <p className={cn(BODY, "max-w-[32em]")}>{t(`${key}.body`)}</p>
                        {shot(key, "(min-width: 1024px) 600px, 100vw")}
                    </article>
                ))}
            </div>

            <ul
                aria-label={t("more.aria")}
                className="grid gap-px border-t border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
            >
                {more.map((item) => (
                    <li key={item.title} className="flex flex-col gap-1.5 bg-background px-5 pt-7 pb-8 sm:px-8">
                        <span className={ITEM_TITLE}>{item.title}</span>
                        <span className={BODY}>{item.body}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}
