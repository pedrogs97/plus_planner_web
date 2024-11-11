import { Suspense, ReactNode } from 'react'
import { Loading } from '@/components/Feedback'
import { AuthProvider, ThemeProvider, WebsocketProvider } from '@/contexts'

export function Providers ({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <Suspense fallback={<Loading />}>
            <AuthProvider>
                <WebsocketProvider>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </WebsocketProvider>
            </AuthProvider>
        </Suspense>
    )
}
