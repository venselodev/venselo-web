"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

const subscribe = () => () => {}

export function ThemeSwitch({ label, dark, light }: { label: string; dark: string; light: string }) {
    const { resolvedTheme, setTheme } = useTheme()
    // The theme is only known on the client; render neutral until then to avoid a hydration mismatch.
    const mounted = useSyncExternalStore(
        subscribe,
        () => true,
        () => false
    )
    const current = mounted ? resolvedTheme : undefined

    return (
        <div
            role="group"
            aria-label={label}
            className="inline-flex overflow-hidden rounded-sm border border-line-strong"
        >
            {(
                [
                    ["dark", dark],
                    ["light", light],
                ] as const
            ).map(([value, text]) => (
                <button
                    key={value}
                    type="button"
                    aria-pressed={current === value}
                    onClick={() => setTheme(value)}
                    className={cn(
                        "h-[30px] px-2.5 text-xs font-medium transition-colors duration-100 not-first:border-l not-first:border-border focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
                        current === value
                            ? "bg-foreground text-background"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    {text}
                </button>
            ))}
        </div>
    )
}
