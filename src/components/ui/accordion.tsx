"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

// shadcn Accordion restyled to the Swiss grid: hairline rows, no radius, a plus that turns into a cross.
function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
    return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
    return (
        <AccordionPrimitive.Item
            data-slot="accordion-item"
            className={cn("border-b border-border", className)}
            {...props}
        />
    )
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
    return (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                data-slot="accordion-trigger"
                className={cn(
                    "group/trigger flex min-h-14 flex-1 items-center justify-between gap-6 py-3.5 text-left text-base leading-[22px] font-medium transition-colors outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
                    className
                )}
                {...props}
            >
                {children}
                <HugeiconsIcon
                    icon={Add01Icon}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted-foreground transition-transform duration-100 group-data-[state=open]/trigger:rotate-45"
                />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    )
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
    return (
        <AccordionPrimitive.Content
            data-slot="accordion-content"
            className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
            {...props}
        >
            <div className={cn("max-w-[44em] pr-12 pb-5 leading-[22px] text-muted-foreground", className)}>
                {children}
            </div>
        </AccordionPrimitive.Content>
    )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
