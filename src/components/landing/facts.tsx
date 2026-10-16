import { getTranslations } from "next-intl/server"

import { BODY, ITEM_TITLE } from "./grid"

type Item = { title: string; body: string }

export async function Facts() {
    const t = await getTranslations("facts")
    const items = t.raw("items") as Item[]

    return (
        <ul
            aria-label={t("aria")}
            className="grid gap-px border-t border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
        >
            {items.map((item) => (
                <li key={item.title} className="flex flex-col gap-1.5 bg-background px-5 pt-6 pb-7 sm:px-8">
                    <span className={ITEM_TITLE}>{item.title}</span>
                    <span className={BODY}>{item.body}</span>
                </li>
            ))}
        </ul>
    )
}
