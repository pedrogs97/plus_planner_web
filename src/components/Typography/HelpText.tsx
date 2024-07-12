import { TypographyProps } from "@/interfaces/typography"

export function HelperText({className, children}: TypographyProps){
    return(
        <div className={`text-slate-400 ${className}`}>{children}</div>
    )
}