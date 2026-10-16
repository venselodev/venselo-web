// Mirror of webcore's src/constants/pricing.ts. Keep the prices and caps in sync with it.
export const TRIAL_DAYS = 7 // agency plans only

export const BILLING_INTERVALS = ["month", "year"] as const
export type BillingInterval = (typeof BILLING_INTERVALS)[number]

/** The solo Agent plan is sold monthly only. */
export const AGENT_PLAN = { id: "agent", priceMonth: 10 } as const

export type AgencyPlan = {
    id: "agency_10" | "agency_30" | "agency_60" | "agency_unlimited"
    /** Max agents; null = unlimited. Managers never count. */
    agentCap: number | null
    /** USD. Yearly = 10 months. */
    price: Record<BillingInterval, number>
}

export const AGENCY_PLANS: readonly AgencyPlan[] = [
    { id: "agency_10", agentCap: 10, price: { month: 75, year: 750 } },
    { id: "agency_30", agentCap: 30, price: { month: 180, year: 1800 } },
    { id: "agency_60", agentCap: 60, price: { month: 290, year: 2900 } },
    { id: "agency_unlimited", agentCap: null, price: { month: 330, year: 3300 } },
]
