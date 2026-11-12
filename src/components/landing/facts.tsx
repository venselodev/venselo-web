import { getTranslations } from "next-intl/server"

import { cn } from "@/lib/utils"
import { CARD, GUTTER } from "./grid"
import { TILE_TONES } from "./tile-tones"

type Item = { title: string; body: string }

export async function Facts() {
    const t = await getTranslations("facts")
    const items = t.raw("items") as Item[]

    return (
        <ul aria-label={t("aria")} className={cn(GUTTER, "grid gap-3 pt-4 pb-14 sm:grid-cols-2 lg:grid-cols-4")}>
            {items.map((item, i) => {
                const tone = TILE_TONES[i]
                return (
                    <li key={item.title} className={cn(CARD, "flex flex-col gap-1.5 p-5", tone)}>
                        <span className="font-heading text-[17px] leading-[22px] font-semibold">{item.title}</span>
                        <span className={cn("text-sm leading-[21px]", tone ? "opacity-85" : "text-muted-foreground")}>
                            {item.body}
                        </span>
                    </li>
                )
            })}
        </ul>
    )
}
