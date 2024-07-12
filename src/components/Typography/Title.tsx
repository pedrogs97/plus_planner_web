import { TypographyProps } from "@/interfaces/typography"


export function Title({className, children}: TypographyProps){
    return(
        <p className={`text-2xl font-bold ${className}`}>{children}</p>
    )
}