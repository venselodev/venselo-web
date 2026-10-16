"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Dark is the brand default; visitors can switch to the light paper theme from the footer.
function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
            {children}
        </NextThemesProvider>
    )
}

export { ThemeProvider }
