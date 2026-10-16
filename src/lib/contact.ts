import { z } from "zod"

export const TEAM_SIZES = ["just_me", "2_10", "11_30", "31_60", "60_plus"] as const
export type TeamSize = (typeof TEAM_SIZES)[number]

export const contactSchema = z.object({
    name: z.string().trim().min(1).max(120),
    email: z.email().max(200),
    agency: z.string().trim().max(160).optional().default(""),
    size: z.enum(TEAM_SIZES).optional(),
    message: z.string().trim().min(1).max(5000),
    locale: z.enum(["es", "en"]).default("es"),
    /** Honeypot: must stay empty. */
    website: z.string().max(500).optional().default(""),
})

export type ContactRequest = z.infer<typeof contactSchema>
