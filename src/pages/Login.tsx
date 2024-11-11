import { Link, Navigate } from "react-router-dom"
import { ErrorText, Display } from "@/components/Typography"
import { InputText } from "@/components/Form/Input"
import { ButtonPrimary } from "@/components/ui/Buttons"
import { FormProvider } from "react-hook-form"
import { useLogin } from "@/hooks/pages/useLogin"

export function Login() {
    const { formLogin, currentTheme, currentUser, errorMessage, loading, submitForm} = useLogin()

    if (currentUser) return (<Navigate to="/app" />)

    return (
        <FormProvider {...formLogin}>
            <div data-theme={currentTheme} className="min-h-screen flex items-center bg-base-300">
                <div className="card mx-auto w-full max-w-md shadow-xl">
                    <div className="grid grid-cols-1 bg-base-100 rounded-xl">
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
