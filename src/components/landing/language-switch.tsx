"use client"

import { useLocale } from "next-intl"

import { Link, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { cn } from "@/lib/utils"

export function LanguageSwitch({ label, className }: { label: string; className?: string }) {
    const locale = useLocale()
    const pathname = usePathname()

    return (
        <nav
            aria-label={label}
            className={cn("inline-flex overflow-hidden rounded-sm border border-line-strong", className)}
        >
            {routing.locales.map((l) => {
                const active = l === locale
                return (
                    <Link
                        key={l}
                        href={pathname}
                        locale={l}
                        lang={l}
                        aria-current={active ? "true" : undefined}
                        className={cn(
                            "inline-flex h-[30px] min-w-9 items-center justify-center px-2 font-mono text-[11px] font-medium tracking-[0.04em] transition-colors duration-100 not-first:border-l not-first:border-border focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
                            active ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {l.toUpperCase()}
                    </Link>
                )
            })}
        </nav>
    )
}
