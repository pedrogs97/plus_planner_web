import { Link } from "react-router-dom"
import { ErrorText, Display } from "@/components/Typography"
import { InputText } from "@/components/Form/Input"
import { ButtonPrimary } from "@/components/ui/Buttons"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, FormLoginData } from "@/validation/login"
import { useAuth } from "@/hooks"
import { apiAuthenticator } from "@/services"
import { Navigate } from "react-router-dom";

export function Login() {

    const formLogin = useForm<FormLoginData>({
        resolver: zodResolver(loginSchema),
        reValidateMode: 'onChange',
    })

    const { signIn, currentUser } = useAuth()

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const submitForm = async (data: FormLoginData) => {
        setErrorMessage("")
        setLoading(true)
        const formData = new FormData()
        formData.append('username', data.username)
        formData.append('password', data.password)
        try {
            const response = await apiAuthenticator.post('login/', formData)
            signIn(response.data.accessToken, response.data.refreshToken)
        } catch (error) {
            if (typeof error === 'string')
                setErrorMessage(error)
            else
                setErrorMessage("Não foi possível realizar o login. Se persistir, contate o suporte.")
        }
        setLoading(false)
    }

    if (currentUser) return (<Navigate to="/app" replace />)

    return (
        <FormProvider {...formLogin}>
            <div className="min-h-screen flex items-center bg-orient-900">
                <div className="card mx-auto w-full max-w-md shadow-xl">
                    <div className="grid grid-cols-1 bg-neutral-50 rounded-xl">
                        <div className='py-24 px-10'>
                            <div className="flex flex-row items-center w-full justify-center">
                                <Display className="font-bold text-tango-500 pr-1">Plus</Display>
                                <Display className="font-bold text-orient-800">Planner</Display>
                            </div>
                            <form onSubmit={formLogin.handleSubmit(submitForm)}>

                                <div className="mb-4">

                                    <InputText name="username" type="username" containerStyle="mt-4" labelTitle="Usuário" />

                                    <InputText name="password" type="password" containerStyle="mt-4" labelTitle="Senha" />

                                </div>

                                <div className='text-right text-orient-800'><Link to="/forgot-password"><span className="text-sm inline-block hover:text-orient-700 hover:underline hover:cursor-pointer transition duration-200">Esqueceu a senha?</span></Link>
                                </div>

                                <ErrorText className="mt-8">{errorMessage}</ErrorText>
                                <ButtonPrimary type="submit" loading={loading} >Entrar</ButtonPrimary>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </FormProvider>
    )
}
