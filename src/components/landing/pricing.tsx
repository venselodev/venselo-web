"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { HugeiconsIcon } from "@hugeicons/react"
import { Tick02Icon } from "@hugeicons/core-free-icons"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { AGENCY_PLANS, AGENT_PLAN, TRIAL_DAYS, type AgencyPlan, type BillingInterval } from "@/constants/pricing"
import { SIGN_UP_URL } from "@/lib/site"
import { cn } from "@/lib/utils"
import { BODY, CARD, GUTTER, H3 } from "./grid"
import { SectionHead } from "./section-head"

const whole = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 })
const cents = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function FeatureList({ items }: { items: string[] }) {
    return (
        <ul>
            {items.map((item) => (
                <li
                    key={item}
                    className="flex items-center gap-2.5 border-b border-border py-2.5 text-sm leading-5 last:border-b-0"
                >
                    <HugeiconsIcon
                        icon={Tick02Icon}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="size-4 shrink-0 text-primary-text"
                    />
                    {item}
                </li>
            ))}
        </ul>
    )
}

function Price({ value, unit }: { value: string; unit: string }) {
    return (
        <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-heading text-[44px] leading-[44px] font-semibold tabular-nums sm:text-[56px] sm:leading-[56px]">
                {value}
            </span>
            <span className="text-muted-foreground">{unit}</span>
        </div>
    )
}

export function Pricing() {
    const t = useTranslations("pricing")
    const tc = useTranslations("cta")
    const [interval, setBillingInterval] = useState<BillingInterval>("month")
    const [planId, setPlanId] = useState<AgencyPlan["id"]>("agency_10")
    const yearly = interval === "year"
    const plan = AGENCY_PLANS.find((p) => p.id === planId) ?? AGENCY_PLANS[0]
    const monthlyEquivalent = yearly ? plan.price.year / 12 : plan.price.month

    const agencyNote = [
        yearly ? t("agency.yearlyEquivalent", { amount: cents(plan.price.year / 12) }) : t("agency.billedAfterTrial"),
        plan.agentCap
            ? t("agency.perAgent", { amount: cents(monthlyEquivalent / plan.agentCap), count: plan.agentCap })
            : t("agency.noCap"),
    ].join(" ")

    const agencyFeatures = [
        ...(t.raw("agency.features") as string[]),
        plan.agentCap ? t("agency.capLine", { count: plan.agentCap }) : t("agency.capUnlimited"),
    ]

    const periodButton = (value: BillingInterval, label: string) => (
        <button
            type="button"
            onClick={() => setBillingInterval(value)}
            className={cn(
                "h-11 px-1 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                interval === value ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
        >
            {label}
        </button>
    )

    return (
        <section id="pricing" aria-labelledby="pricing-title" className="border-t border-border">
            <SectionHead label={t("label")} title={t("title")} lede={t("lede")} titleId="pricing-title" />

            <div className={cn(GUTTER, "grid gap-3 lg:grid-cols-[5fr_7fr]")}>
                <article className={cn(CARD, "flex min-w-0 flex-col gap-5 p-6 sm:p-8")}>
                    <div className="flex items-center justify-between gap-3">
                        <h3 className={H3}>{t("agent.name")}</h3>
                        <Badge variant="violet">{t("agent.tag")}</Badge>
                    </div>
                    <p className={BODY}>{t("agent.description")}</p>
                    <Price value={`US$ ${whole(AGENT_PLAN.priceMonth)}`} unit={t("perMonth")} />
                    <p className="-mt-2.5 text-[13px] leading-[18px] text-muted-foreground">{t("agent.billing")}</p>
                    <div>
                        <Button asChild size="lg" variant="outline">
                            <a href={SIGN_UP_URL}>{tc("start")}</a>
                        </Button>
                    </div>
                    <FeatureList items={t.raw("agent.features") as string[]} />
                </article>

                <article className={cn(CARD, "flex min-w-0 flex-col gap-5 border-primary p-6 sm:p-8")}>
                    <div className="flex items-center justify-between gap-3">
                        <h3 className={H3}>{t("agency.name")}</h3>
                        <Badge variant="gold">{t("agency.tag", { days: TRIAL_DAYS })}</Badge>
                    </div>
                    <p className={BODY}>{t("agency.description")}</p>

                    <div
                        role="group"
                        aria-label={t("period.aria")}
                        className="-my-2 -ml-1 flex flex-wrap items-center gap-2"
                    >
                        {periodButton("month", t("period.monthly"))}
                        <Switch
                            checked={yearly}
                            onCheckedChange={(checked) => setBillingInterval(checked ? "year" : "month")}
                            aria-label={t("period.yearlyAria")}
                        />
                        {periodButton("year", t("period.yearly"))}
                        <Badge variant="pink" className="ml-2">
                            {t("period.free")}
                        </Badge>
                    </div>

                    <div
                        role="group"
                        aria-label={t("agency.tiersAria")}
                        className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                    >
                        {AGENCY_PLANS.map((p) => {
                            const active = p.id === plan.id
                            return (
                                <button
                                    key={p.id}
                                    type="button"
                                    aria-pressed={active}
                                    onClick={() => setPlanId(p.id)}
                                    className={cn(
                                        "flex min-h-14 flex-col items-start gap-0.5 rounded-sm border px-3 py-2 text-left text-[13px] leading-[18px] font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                                        active
                                            ? "border-primary bg-primary-soft text-primary-text"
                                            : "border-line-strong hover:bg-surface-hover"
                                    )}
                                >
                                    <span>
                                        {p.agentCap ? t("agency.upTo", { count: p.agentCap }) : t("agency.unlimited")}
                                    </span>
                                    <span
                                        className={cn(
                                            "text-xs leading-4 tabular-nums",
                                            active ? "opacity-85" : "text-muted-foreground"
                                        )}
                                    >
                                        US$ {whole(p.price[interval])} {yearly ? t("yr") : t("mo")}
                                    </span>
                                </button>
                            )
                        })}
                    </div>

                    <Price value={`US$ ${whole(plan.price[interval])}`} unit={yearly ? t("perYear") : t("perMonth")} />
                    <p className="-mt-2.5 text-[13px] leading-[18px] text-muted-foreground" aria-live="polite">
                        {agencyNote}
                    </p>
                    <div>
                        <Button asChild size="lg">
                            <a href={SIGN_UP_URL}>{t("agency.startTrial", { days: TRIAL_DAYS })}</a>
                        </Button>
                    </div>
                    <FeatureList items={agencyFeatures} />
                </article>
            </div>
            <p className={cn(GUTTER, "py-5 text-[13px] leading-[18px] text-muted-foreground")}>{t("fine")}</p>
        </section>
    )
}
