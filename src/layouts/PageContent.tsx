import { Suspense, useEffect, useRef } from "react";
import { Header } from "./Header";
import { Route, Routes } from 'react-router-dom'
import { SuspenseContent } from './SuspenseContent'
import { routes } from "@/routes";
import { NotFound } from "@/pages";


export function PageContent() {
    const mainContentRef = useRef<HTMLElement>(null);

    // Scroll back to top on new page load
    useEffect(() => {
        mainContentRef.current?.scroll({
            top: 0,
            behavior: "smooth"
            });
    }, [])  

    return (
        <div className="drawer-content flex flex-col h-screen">
            <Header />
            <main className="flex-1 overflow-y-auto md:pt-4 pt-4 px-6  bg-base-200" ref={mainContentRef}>
                <Suspense fallback={<SuspenseContent />}>
                        <Routes>
                            {
                                routes.map((route) => {
                                    return(
                                        <Route
                                            key={route.id}                     
                                            path={`${route.path}`}
                                            element={<route.component />}
                                        />
                                    )
                                })
                            }
                            {/* Redirecting unknown url to 404 page */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                </Suspense>
            </main>
        </div>
    )
}
