import { getTranslations } from "next-intl/server"

import { cn } from "@/lib/utils"
import { BODY, GRID, H3, MAIN, RAIL } from "./grid"

// Alert rules from webcore's src/lib/alerts.ts, laid out on a 120-day ruler before check-in.
const MARKERS = [
    { days: 120, label: "120", lane: "top" },
    { days: 90, label: "90", lane: "bottom" },
    { days: 60, label: "60", lane: "top" },
    { days: 45, label: "45", lane: "bottom" },
    { days: 30, label: "30", lane: "top" },
    { days: 7, label: "7 / 3", lane: "bottom", alignEnd: true },
    { days: 0, label: "0", lane: "top", alignEnd: true },
] as const

const SPAN = 120
const position = (days: number) => `${((SPAN - days) / SPAN) * 100}%`
const TICKS = Array.from({ length: SPAN / 10 + 1 }, (_, i) => SPAN - i * 10)

type Rule = { title: string; product: string }

export async function AlertTimeline() {
    const t = await getTranslations("timeline")
    const rules = t.raw("rules") as Rule[]
    const items = MARKERS.map((m, i) => ({ ...m, ...rules[i] }))
    const ariaLabel = `${t("aria")}: ${items
        .filter((m) => m.days > 0)
        .map((m) => `${m.label}: ${m.title}, ${m.product}`)
        .join("; ")}`

    return (
        <section aria-labelledby="timeline-title" className="border-t border-border">
            <div className={cn(GRID, "items-start gap-y-3 pt-8 pb-2")}>
                <p className={cn(RAIL, "label-mono lg:pt-1.5")}>{t("label")}</p>
                <div className={cn(MAIN, "grid gap-x-6 gap-y-3 sm:grid-cols-2")}>
                    <h2 id="timeline-title" className={H3}>
                        {t("title")}
                    </h2>
                    <p className={BODY}>{t("body")}</p>
                </div>
            </div>

            {/* Desktop: the ruler */}
            <div role="img" aria-label={ariaLabel} className="relative mx-8 mt-6 mb-8 hidden h-[250px] lg:block">
                <div className="absolute inset-x-0 top-[124px] h-px bg-foreground" />
                {TICKS.map((d) => (
                    <span
                        key={d}
                        className="absolute top-[125px] h-1.5 w-px bg-line-strong"
                        style={{ left: position(d) }}
                    />
                ))}
                {items.map((m) => (
                    <div key={m.days}>
                        <span
                            className="absolute top-[121px] -ml-[3px] size-[7px] bg-foreground"
                            style={{ left: position(m.days) }}
                        />
                        <div
                            className={cn(
                                "absolute flex w-[190px] flex-col gap-0.5",
                                m.lane === "top"
                                    ? "top-0 h-[124px] justify-start"
                                    : "top-[125px] h-[125px] justify-end",
                                "alignEnd" in m
                                    ? "-translate-x-full border-r border-line-strong pr-2.5 text-right"
                                    : "border-l border-line-strong pl-2.5"
                            )}
                            style={{ left: position(m.days) }}
                        >
                            <span className="font-mono text-[22px] leading-[26px] font-medium tracking-[-0.02em]">
                                {m.label}
                            </span>
                            <span className="text-[13px] leading-[17px] font-semibold">{m.title}</span>
                            {m.product ? (
                                <span className="text-xs leading-4 text-muted-foreground">{m.product}</span>
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile and tablet: the same rules as a list */}
            <ol className="mx-5 mt-4 mb-8 border-t border-border sm:mx-8 lg:hidden">
                {items.map((m) => (
                    <li key={m.days} className="grid grid-cols-[64px_1fr] gap-3 border-b border-border py-3">
                        <span className="font-mono text-[22px] leading-[26px] font-medium tracking-[-0.02em]">
                            {m.label}
                        </span>
                        <span>
                            <span className="block text-[13px] leading-[17px] font-semibold">{m.title}</span>
                            {m.product ? (
                                <span className="text-xs leading-4 text-muted-foreground">{m.product}</span>
                            ) : null}
                        </span>
                    </li>
                ))}
            </ol>
        </section>
    )
}
