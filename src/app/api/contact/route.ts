import { NextResponse } from "next/server"
import { Resend } from "resend"

import { contactSchema } from "@/lib/contact"

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
// Per-instance and best effort: enough to stop a form being hammered, not a real rate limiter.
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
    const now = Date.now()
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
    recent.push(now)
    hits.set(ip, recent)
    return recent.length > MAX_PER_WINDOW
}

const escapeHtml = (s: string) =>
    s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!)

export async function POST(request: Request) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    if (rateLimited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 })

    let json: unknown
    try {
        json = await request.json()
    } catch {
        return NextResponse.json({ error: "invalid_json" }, { status: 400 })
    }

    const parsed = contactSchema.safeParse(json)
    if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 })
    const data = parsed.data

    // A filled honeypot is a bot: answer as if it worked and send nothing.
    if (data.website) return new NextResponse(null, { status: 204 })

    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.RESEND_FROM_EMAIL
    const to = process.env.CONTACT_TO_EMAIL
    if (!apiKey || !from || !to) {
        console.error("[contact] RESEND_API_KEY, RESEND_FROM_EMAIL or CONTACT_TO_EMAIL is not set")
        return NextResponse.json({ error: "not_configured" }, { status: 503 })
    }

    const rows: [string, string][] = [
        ["Name", data.name],
        ["Email", data.email],
        ["Agency", data.agency || "-"],
        ["Agents", data.size ?? "-"],
        ["Language", data.locale],
    ]
    const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${data.message}`
    const html = `<table>${rows
        .map(([k, v]) => `<tr><td style="padding:2px 12px 2px 0;color:#57554f">${k}</td><td>${escapeHtml(v)}</td></tr>`)
        .join("")}</table><p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`

    const { error } = await new Resend(apiKey).emails.send({
        from,
        to,
        replyTo: data.email,
        subject: `Venselo web: ${data.name}${data.agency ? ` (${data.agency})` : ""}`,
        text,
        html,
    })

    if (error) {
        console.error("[contact] Resend error", error)
        return NextResponse.json({ error: "send_failed" }, { status: 502 })
    }

    return new NextResponse(null, { status: 204 })
}
