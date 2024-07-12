import { useFormContext } from "react-hook-form"

interface InputTextProps {
    name: string,
    labelTitle: string,
    labelStyle?: string,
    type?: string,
    containerStyle?: string,
    placeholder?: string,
}


export function InputText({name, labelTitle, labelStyle, type, containerStyle, placeholder}: Readonly<InputTextProps>){
    const { register } = useFormContext()

    return(
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label text-tango-500">
                <span className={"label-text" + labelStyle}>{labelTitle}</span>
            </label>
            <input className="input input-bordered w-full bg-tango-50 text-orient-900" type={type ?? "text"} placeholder={placeholder ?? ""} {...register(name)} />
        </div>
    )
}