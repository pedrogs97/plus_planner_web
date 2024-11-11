import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, FormLoginData } from "@/validation/login"
import { useAuth } from "@/hooks"
import { apiAuthenticator } from "@/services"
import { useTheme } from "@/hooks/useTheme"

export function useLogin() {
    const formLogin = useForm<FormLoginData>({
        resolver: zodResolver(loginSchema),
        reValidateMode: 'onChange',
    })

    const { signIn, currentUser } = useAuth()

    const { currentTheme } = useTheme()

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

    return {
        formLogin,
        currentTheme,
        loading,
        errorMessage,
        submitForm,
        currentUser,
    }
}