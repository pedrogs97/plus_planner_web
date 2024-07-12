import { TypographyProps } from "@/interfaces/typography"


export function Headline({className, children}: TypographyProps){
    return(
        <p className={`text-xl font-bold ${className}`}>{children}</p>
    )
}