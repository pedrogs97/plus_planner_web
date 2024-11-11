import { createContext, ReactNode, useCallback, useMemo, useState } from "react"
import { IThemeContext } from "@/interfaces/context";

export const ThemeContext = createContext<IThemeContext>({
    currentTheme: 'dark'
})

export function ThemeProvider ({children}: Readonly<{children: ReactNode}>) {
    const [currentTheme, setCurrentTheme] = useState<string>('dark')

    const updateTheme = useCallback((newTheme: string) => {
        localStorage.setItem('theme', newTheme)
        setCurrentTheme(newTheme)
    }, [])

    const value = useMemo(() => {
        return {
            updateTheme,
            currentTheme,
        }
    }, [updateTheme, currentTheme])

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )

}