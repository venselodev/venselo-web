import { cn } from "@/lib/utils"
import { GRID, H2, LEDE, MAIN, RAIL } from "./grid"

export function SectionHead({
    label,
    title,
    lede,
    titleId,
}: {
    label: string
    title: string
    lede?: string
    titleId: string
}) {
    return (
        <div className={cn(GRID, "pt-14 pb-8 sm:pt-[72px] sm:pb-12")}>
            <p className={cn(RAIL, "mb-4 label-mono lg:mb-0 lg:pt-3")}>{label}</p>
            <div className={cn(MAIN, "flex flex-col gap-4")}>
                <h2 id={titleId} className={H2}>
                    {title}
                </h2>
                {lede ? <p className={LEDE}>{lede}</p> : null}
            </div>
        </div>
    )
}
