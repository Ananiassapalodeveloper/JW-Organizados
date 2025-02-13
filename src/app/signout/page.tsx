"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut } from "lucide-react"

export default function SignOutPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      router.push("/signin")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[350px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Saindo...</CardTitle>
            <CardDescription className="text-center">Obrigado por usar nosso sistema</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-6">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <LogOut className="h-16 w-16 text-primary" />
            </motion.div>
            <motion.p
              className="mt-4 text-center text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Você será redirecionado em alguns segundos...
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

