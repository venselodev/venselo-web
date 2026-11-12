import { cva } from "class-variance-authority"

// Sunset castle: 8px corners. `default` (violet) is the single primary action of
// a view and lifts with a soft glow on hover; `secondary` is a violet tint;
// destructive is outlined in danger, never a solid red fill.
export const buttonVariants = cva(
    "group/button inline-flex shrink-0 items-center justify-center rounded-sm border border-transparent text-[13px] font-medium whitespace-nowrap transition-[background-color,border-color,color,opacity,box-shadow,transform] duration-150 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive motion-reduce:transition-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: {
                default:
                    "border-(--brand-edge) bg-primary text-primary-foreground hover:-translate-y-px hover:bg-primary-hover hover:shadow-glow motion-reduce:hover:translate-y-0",
                secondary: "bg-primary-soft text-primary-text hover:opacity-85",
                outline:
                    "border-line-strong bg-transparent text-foreground hover:border-muted-foreground hover:bg-surface-hover aria-expanded:bg-surface-hover",
                ghost: "text-foreground hover:bg-surface-hover aria-expanded:bg-surface-hover",
                destructive: "border-danger bg-transparent text-danger hover:bg-danger-soft",
                link: "h-auto px-0 text-primary-text underline decoration-1 underline-offset-[3px] hover:decoration-2",
            },
            size: {
                default: "h-8 gap-2 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
                xs: "h-6 gap-1 px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
                sm: "h-7 gap-1.5 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
                lg: "h-10 gap-2 px-5 text-sm has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
                icon: "size-8",
                "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3.5",
                "icon-sm": "size-7",
                "icon-lg": "size-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)
