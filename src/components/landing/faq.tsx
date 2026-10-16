import { getTranslations } from "next-intl/server"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { GRID, MAIN } from "./grid"
import { SectionHead } from "./section-head"

type Item = { q: string; a: string }

export async function Faq() {
    const t = await getTranslations("faq")
    const items = t.raw("items") as Item[]

    return (
        <section id="faq" aria-labelledby="faq-title" className="border-t border-border">
            <SectionHead label={t("label")} title={t("title")} titleId="faq-title" />
            <div className={cn(GRID, "pb-[72px]")}>
                <Accordion
                    type="single"
                    collapsible
                    defaultValue="faq-0"
                    className={cn(MAIN, "border-t border-border lg:col-start-4")}
                >
                    {items.map((item, i) => (
                        <AccordionItem key={item.q} value={`faq-${i}`}>
                            <AccordionTrigger>{item.q}</AccordionTrigger>
                            <AccordionContent>{item.a}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
