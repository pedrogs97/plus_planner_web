import { createContext, ReactNode, useCallback, useMemo, useState } from "react"
import { jwtDecode } from "jwt-decode";
import { IAuthContext, ILoginResponse, IUser } from "@/interfaces/context";

export const AuthContext = createContext<IAuthContext>({
    signIn: () => {},
    currentUser: null,
})

export function AuthProvider ({children}: Readonly<{children: ReactNode}>) {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null)

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
            permissions: decoded.permissions
        })
    }, [])

    const signOut = useCallback(() => {
        localStorage.clear()
        setCurrentUser(null)
    }, [])

    const value = useMemo(() => {
        return {
            currentUser,
            signIn,
            signOut,
        }
    }, [signIn, signOut, currentUser])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}