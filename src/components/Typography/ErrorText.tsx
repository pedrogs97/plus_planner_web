import { TypographyProps } from "@/interfaces/typography"

export function ErrorText({className, children}: TypographyProps){
    return(
        <p className={`text-sm text-center text-error ${className}`}>{children}</p>
    )
}
