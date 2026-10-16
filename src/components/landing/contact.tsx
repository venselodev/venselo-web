import { getTranslations } from "next-intl/server"

import { cn } from "@/lib/utils"
import { BODY, GRID, LEDE } from "./grid"
import { ContactForm } from "./contact-form"
import { SectionHead } from "./section-head"

export async function Contact() {
    const t = await getTranslations("contact")

    return (
        <section id="contact" aria-labelledby="contact-title" className="border-t border-border">
            <SectionHead label={t("label")} title={t("title")} titleId="contact-title" />
            <div className={cn(GRID, "gap-y-8 pb-[72px]")}>
                <div className="col-span-12 flex flex-col gap-4 lg:col-span-5">
                    <p className={LEDE}>{t("lede")}</p>
                    <p className={BODY}>{t("body")}</p>
                </div>
                <ContactForm className="col-span-12 lg:col-span-6 lg:col-start-7" />
            </div>
        </section>
    )
}
