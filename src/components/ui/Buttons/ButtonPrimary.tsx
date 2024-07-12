import { ReactNode } from "react"

interface ButtonProps {
    type: 'button' | 'submit' | 'reset',
    classname?: string,
    loading: boolean,
    children: ReactNode,
}


export function ButtonPrimary({ classname, children, loading = false, type = "button" }: Readonly<ButtonProps>) {
    return (
        <button type={type} className={"btn mt-2 w-full bg-orient-900 border-orient-900 text-neutral-50 hover:bg-orient-700 hover:border-orient-700 " + classname}>
            {
                loading ? (
                    <span className="loading loading-spinner"></span>
                )
                : children
            }
        </button>
    )
}
