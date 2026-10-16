import { getTranslations } from "next-intl/server"

import { cn } from "@/lib/utils"
import { BODY, GRID, H3, ITEM_TITLE, LEDE } from "./grid"
import { SectionHead } from "./section-head"

type Item = { title: string; body: string }

export async function Agencies() {
    const t = await getTranslations("agencies")
    const modules = t.raw("modules") as Item[]
    const steps = t.raw("payout.steps") as Item[]
    const bonus = t.raw("bonus.items") as Item[]

    return (
        <section id="agencies" aria-labelledby="agencies-title" className="border-t border-border">
            <SectionHead label={t("label")} title={t("title")} titleId="agencies-title" />
            <div className={cn(GRID, "gap-y-10 pb-[72px]")}>
                <div className="col-span-12 flex flex-col gap-5 lg:col-span-5">
                    <p className={LEDE}>{t("lede")}</p>
                    <dl className="mt-3 border-t border-border">
                        {modules.map((m) => (
                            <div
                                key={m.title}
                                className="grid gap-x-4 gap-y-0.5 border-b border-border py-3 sm:grid-cols-[120px_1fr]"
                            >
                                <dt className={ITEM_TITLE}>{m.title}</dt>
                                <dd className={BODY}>{m.body}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <div className="col-span-12 flex flex-col gap-10 lg:col-span-6 lg:col-start-7">
                    <div className="flex flex-col gap-3">
                        <h3 className={H3}>{t("payout.title")}</h3>
                        <ol className="border border-border">
                            {steps.map((s, i) => (
                                <li
                                    key={s.title}
                                    className="grid grid-cols-[48px_1fr] gap-3 border-b border-border p-4 last:border-b-0"
                                >
                                    <span className="font-mono text-[22px] leading-[26px] font-medium text-muted-foreground">
                                        {i + 1}
                                    </span>
                                    <span>
                                        <span className={cn(ITEM_TITLE, "block")}>{s.title}</span>
                                        <span className={BODY}>{s.body}</span>
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h3 className={H3}>{t("bonus.title")}</h3>
                        <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
                            {bonus.map((b) => (
                                <div key={b.title} className="flex flex-col gap-1 bg-background p-4">
                                    <span className={ITEM_TITLE}>{b.title}</span>
                                    <span className={BODY}>{b.body}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
