"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    CheckmarkCircle02Icon,
    InformationCircleIcon,
    Alert02Icon,
    MultiplicationSignCircleIcon,
    Loading03Icon,
} from "@hugeicons/core-free-icons"

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            // Not bottom-right: right-hand sheets keep Cancel/Submit there, and an error toast would cover the retry button.
            position="top-center"
            className="toaster group"
            icons={{
                success: <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="size-4" />,
                info: <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} className="size-4" />,
                warning: <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="size-4" />,
                error: <HugeiconsIcon icon={MultiplicationSignCircleIcon} strokeWidth={2} className="size-4" />,
                loading: <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-4 animate-spin" />,
            }}
            style={
                {
                    "--normal-bg": "var(--popover)",
                    "--normal-text": "var(--popover-foreground)",
                    "--normal-border": "var(--line-strong)",
                    "--border-radius": "var(--radius)",
                } as React.CSSProperties
            }
            toastOptions={{
                classNames: {
                    toast: "cn-toast !rounded-sm !shadow-lg",
                    success: "[&_[data-icon]]:text-success",
                    error: "[&_[data-icon]]:text-danger",
                    info: "[&_[data-icon]]:text-info",
                    warning: "[&_[data-icon]]:text-warning",
                },
            }}
            {...props}
        />
    )
}

export { Toaster }
