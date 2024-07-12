import { TypographyProps } from "@/interfaces/typography"


export function Subheadline({className, children}: TypographyProps){
    return(
        <p className={`text-lg font-semibold ${className}`}>{children}</p>
    )
}