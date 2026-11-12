import { cva } from "class-variance-authority"

// Sunset castle: 8px corners, never a pill. Status variants (green, orange, red, sky)
// draw a 6px round dot before the label so status never relies on color alone;
// violet, pink and gold are the brand tints.
const statusMarker =
    "before:size-1.5 before:shrink-0 before:rounded-full before:bg-current before:content-[''] has-[>svg]:before:hidden"

export const badgeVariants = cva(
    "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-sm border border-transparent px-2 text-[11px] leading-none font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:pointer-events-none [&>svg]:size-3!",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground",
                secondary: "border-border bg-secondary text-secondary-foreground",
                destructive: `bg-danger-soft text-danger ${statusMarker}`,
                outline: "border-line-strong text-foreground",
                ghost: "hover:bg-surface-hover hover:text-foreground",
                link: "text-primary-text underline-offset-4 hover:underline",
                blue: `bg-info-soft text-info ${statusMarker}`,
                green: `bg-success-soft text-success ${statusMarker}`,
                sky: `bg-info-soft text-info ${statusMarker}`,
                violet: "bg-primary-soft text-primary-text",
                pink: "bg-rose-soft text-rose-text",
                gold: "bg-gold-soft text-gold-text",
                red: `bg-danger-soft text-danger ${statusMarker}`,
                orange: `bg-warning-soft text-warning ${statusMarker}`,
                yellow: `bg-warning-soft text-warning ${statusMarker}`,
                amber: `bg-warning-soft text-warning ${statusMarker}`,
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)
