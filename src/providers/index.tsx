import { Suspense, ReactNode } from 'react'
import { Loading } from '@/components/Feedback'
import { AuthProvider } from '@/contexts'

export function Providers ({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <Suspense fallback={<Loading />}>
              <AuthProvider>
                  {children}
              </AuthProvider>
        </Suspense>
    )
}
