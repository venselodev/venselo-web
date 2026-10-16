"use client"

import { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { TEAM_SIZES, type TeamSize } from "@/lib/contact"
import { cn } from "@/lib/utils"

export function ContactForm({ className }: { className?: string }) {
    const t = useTranslations("contact.form")
    const locale = useLocale()
    const [size, setSize] = useState<TeamSize | "">("")
    const [sending, setSending] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const form = event.currentTarget
        const data = new FormData(form)
        const body = {
            name: String(data.get("name") ?? "").trim(),
            email: String(data.get("email") ?? "").trim(),
            agency: String(data.get("agency") ?? "").trim(),
            size: size || undefined,
            message: String(data.get("message") ?? "").trim(),
            website: String(data.get("website") ?? ""),
            locale,
        }

        if (!body.name || !/^\S+@\S+\.\S+$/.test(body.email) || !body.message) {
            toast.error(t("invalid"))
            return
        }

        setSending(true)
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })
            if (res.status === 400) {
                toast.error(t("invalid"))
                return
            }
            if (!res.ok) throw new Error(`contact ${res.status}`)
            toast.success(t("success"))
            form.reset()
            setSize("")
        } catch {
            toast.error(t("error"))
        } finally {
            setSending(false)
        }
    }

    return (
        <form
            aria-label={t("aria")}
            onSubmit={handleSubmit}
            noValidate
            className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2", className)}
        >
            <Field>
                <FieldLabel htmlFor="contact-name">{t("name")}</FieldLabel>
                <Input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    placeholder={t("namePlaceholder")}
                    required
                    className="h-9"
                />
            </Field>
            <Field>
                <FieldLabel htmlFor="contact-email">{t("email")}</FieldLabel>
                <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t("emailPlaceholder")}
                    required
                    className="h-9"
                />
            </Field>
            <Field>
                <FieldLabel htmlFor="contact-agency">{t("agency")}</FieldLabel>
                <Input
                    id="contact-agency"
                    name="agency"
                    autoComplete="organization"
                    placeholder={t("agencyPlaceholder")}
                    className="h-9"
                />
            </Field>
            <Field>
                <FieldLabel htmlFor="contact-size">{t("size")}</FieldLabel>
                <Select value={size} onValueChange={(v) => setSize(v as TeamSize)}>
                    <SelectTrigger id="contact-size" className="h-9 w-full">
                        <SelectValue placeholder={t("sizePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                        {TEAM_SIZES.map((s) => (
                            <SelectItem key={s} value={s}>
                                {t(`sizes.${s}`)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Field>
            <Field className="sm:col-span-2">
                <FieldLabel htmlFor="contact-message">{t("message")}</FieldLabel>
                <Textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder={t("messagePlaceholder")}
                    required
                    className="min-h-28"
                />
            </Field>
            {/* Honeypot: hidden from people, filled in by bots. */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <div className="flex justify-end sm:col-span-2">
                <Button type="submit" size="lg" variant="secondary" disabled={sending}>
                    {sending ? <Spinner /> : null}
                    {sending ? t("sending") : t("send")}
                </Button>
            </div>
        </form>
    )
}
