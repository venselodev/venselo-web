import Image from "next/image"

import type { Locale } from "@/i18n/routing"
import { screenshot, type ScreenshotName } from "@/lib/screenshots"

// Renders the dark and light captures of a screen; the theme class on <html> shows the right one.
export function Screenshot({
    locale,
    name,
    alt,
    caption,
    note,
    sizes,
    priority = false,
    className,
}: {
    locale: Locale
    name: ScreenshotName
    alt: string
    caption: string
    note?: string
    sizes: string
    priority?: boolean
    className?: string
}) {
    const dark = screenshot(locale, name, "dark")
    const light = screenshot(locale, name, "light")

    return (
        <figure className={className}>
            <div className="overflow-hidden border border-border bg-card">
                {dark.src === light.src ? (
                    <Image
                        src={dark.src}
                        width={dark.width}
                        height={dark.height}
                        alt={alt}
                        sizes={sizes}
                        fetchPriority={priority ? "high" : undefined}
                        className="block h-auto w-full"
                    />
                ) : (
                    <>
                        <Image
                            src={dark.src}
                            width={dark.width}
                            height={dark.height}
                            alt={alt}
                            sizes={sizes}
                            fetchPriority={priority ? "high" : undefined}
                            className="hidden h-auto w-full dark:block"
                        />
                        <Image
                            src={light.src}
                            width={light.width}
                            height={light.height}
                            alt={alt}
                            sizes={sizes}
                            fetchPriority={priority ? "high" : undefined}
                            className="block h-auto w-full dark:hidden"
                        />
                    </>
                )}
            </div>
            <figcaption className="flex flex-wrap justify-between gap-3 pt-2.5 text-[13px] leading-[18px] text-muted-foreground">
                <span>{caption}</span>
                {note ? <span>{note}</span> : null}
            </figcaption>
        </figure>
    )
}
