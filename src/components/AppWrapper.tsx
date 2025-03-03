"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
// import Header from "@/components/header"
import SplashScreen from "@/components/SplashScreen"
import type React from "react" // Added import for React
import { Toaster } from "@/components/ui/toaster"

export default function AppWrapper({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 2000)
    }, [])

    return (
        <AnimatePresence mode="wait">
            {isLoading ? (
                <SplashScreen finishLoading={() => setIsLoading(false)} />
            ) : (
                <div className="flex h-screen flex-col">
                    {/* <Header /> */}
                    <main className="flex-1  p-4 md:p-8">{children}</main>
                    <Toaster />
                </div>
            )}
        </AnimatePresence>
    )
}

