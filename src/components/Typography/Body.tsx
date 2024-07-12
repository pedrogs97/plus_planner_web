import { TypographyProps } from "@/interfaces/typography"


export function Body({className, children}: TypographyProps){
    return(
        <p className={`text-base ${className}`}>{children}</p>
    )
}