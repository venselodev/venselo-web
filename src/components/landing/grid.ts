// The page sits on a 12-column grid: a 3-column rail for section names, 9 columns of content.
export const GRID = "grid grid-cols-12 gap-x-4 px-5 sm:gap-x-6 sm:px-8"
export const RAIL = "col-span-12 lg:col-span-3"
export const MAIN = "col-span-12 lg:col-span-9"
// Rounded cards laid out in rows sit inside this gutter, `gap-3` apart.
export const GUTTER = "px-5 sm:px-8"

// Titles speak in Fredoka (font-heading); everything else is Inter.
export const H1 = "font-heading text-[clamp(40px,5.6vw,72px)] leading-[1.04] font-semibold"
export const H2 = "max-w-[17em] font-heading text-[clamp(28px,3.2vw,44px)] leading-[1.1] font-semibold"
export const H3 = "font-heading text-xl leading-[26px] font-semibold"
export const LEDE = "max-w-[36em] text-[17px] leading-[26px] text-muted-foreground"
export const BODY = "text-sm leading-[21px] text-muted-foreground"
export const ITEM_TITLE = "text-[15px] leading-5 font-semibold"
export const CARD = "rounded-md border border-border bg-card"
export const TEXT_LINK =
    "text-sm font-medium text-primary-text underline decoration-primary-text/40 underline-offset-4 transition-colors duration-150 hover:decoration-primary-text"
