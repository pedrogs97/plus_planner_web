import { TypographyProps } from "@/interfaces/typography"

export function Subtitle({className, children}: TypographyProps){
    return(
        <div className={`text-xl font-semibold ${className}`}>{children}</div>
    )
}