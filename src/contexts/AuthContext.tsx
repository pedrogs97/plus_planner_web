import { createContext, ReactNode, useCallback, useMemo, useState } from "react"
import { jwtDecode } from "jwt-decode";
import { IAuthContext, ILoginResponse, IUser } from "@/interfaces/context";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<IAuthContext>({
    signIn: () => {},
    signOut: () => {},
    currentUser: null,
})

export function AuthProvider ({children}: Readonly<{children: ReactNode}>) {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null)
    const navigate = useNavigate()

    const signIn = useCallback((token: string, refreshToken: string) => {
        localStorage.setItem('accessToken', token)
        localStorage.setItem('refreshToken', refreshToken)
        const decoded = jwtDecode<ILoginResponse>(token);
        setCurrentUser({
            id: decoded.sub,
            fullName: decoded.fullName,
            email: decoded.email,
            profile: decoded.profile,
            profileId: decoded.profileId,
            clinic: decoded.clinic,
            clinicId: decoded.clinicId,
            permissions: decoded.permissions,
            token: token,
            uuid_scheduler: null,
        })
        navigate('/app/calendar')
    }, [navigate, setCurrentUser])

    const signOut = useCallback(() => {
        localStorage.clear()
        setCurrentUser(null)
    }, [])

    const updateCurrentUser = useCallback((user: IUser) => {
        setCurrentUser(user)
    }, [])

    const value = useMemo(() => {
        return {
            currentUser,
            signIn,
            signOut,
            updateCurrentUser,
        }
    }, [signIn, signOut, currentUser, updateCurrentUser])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}