import { cn } from "@/lib/utils"

const STAR_PATH =
    "M12 1.5c.6 5.6 4.9 9.9 10.5 10.5-5.6.6-9.9 4.9-10.5 10.5C11.4 16.9 7.1 12.6 1.5 12 7.1 11.4 11.4 7.1 12 1.5z"

type SparkleProps = {
    /** Size in px of the larger star. */
    size?: number
    className?: string
}

/**
 * Two small four-point stars (gold and rose) that twinkle: the design system's one
 * decorative motif. One per region: beside a page title, on a celebration, in an
 * empty state. Decorative only, and still under prefers-reduced-motion.
 */
const Sparkle = ({ size = 14, className }: SparkleProps) => {
    const small = Math.round(size * 0.6)
    return (
        <span aria-hidden className={cn("inline-flex shrink-0 items-start gap-0.5 text-gold", className)}>
            <svg width={size} height={size} viewBox="0 0 24 24" className="animate-twinkle">
                <path d={STAR_PATH} fill="currentColor" />
            </svg>
            <svg
                width={small}
                height={small}
                viewBox="0 0 24 24"
                className="animate-twinkle text-rose [animation-delay:0.8s]"
            >
                <path d={STAR_PATH} fill="currentColor" />
            </svg>
        </span>
    )
}

export default Sparkle
