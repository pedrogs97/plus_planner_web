import { TypographyProps } from "@/interfaces/typography"

export function Display({ className, children }: TypographyProps) {
  return (
    <p className={`text-3xl font-bold ${className}`}>{children}</p>
  )
}