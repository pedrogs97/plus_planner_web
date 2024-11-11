import { ReactNode } from "react"

interface ButtonProps {
    type: 'button' | 'submit' | 'reset',
    classname?: string,
    loading: boolean,
    children: ReactNode,
}


export function ButtonPrimary({ classname, children, loading = false, type = "button" }: Readonly<ButtonProps>) {
    return (
        <button type={type} className={"btn mt-2 w-full btn-primary " + classname}>
            {
                loading ? (
                    <span className="loading loading-spinner"></span>
                )
                : children
            }
        </button>
    )
}
