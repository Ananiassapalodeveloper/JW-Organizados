"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/Icons"
import { Lock, Mail } from "lucide-react"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 3000)
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-[350px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Entrar</CardTitle>
            <CardDescription className="text-center">Entre na sua conta para acessar o sistema</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Button variant="outline">
                <Icons.gitHub className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline">
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
            </motion.div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Ou continue com</span>
              </div>
            </div>
            <form onSubmit={onSubmit}>
              <div className="grid gap-2">
                <motion.div
                  className="grid gap-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Label className="sr-only" htmlFor="email">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      placeholder="nome@exemplo.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                      className="pl-8"
                    />
                  </div>
                </motion.div>
                <motion.div
                  className="grid gap-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Label className="sr-only" htmlFor="password">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      placeholder="Senha"
                      type="password"
                      autoCapitalize="none"
                      autoComplete="current-password"
                      disabled={isLoading}
                      className="pl-8"
                    />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Button className="w-full" disabled={isLoading}>
                    {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                    Entrar
                  </Button>
                </motion.div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <motion.div
              className="text-sm text-muted-foreground text-center w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Não tem uma conta?{" "}
              <a href="/signup" className="underline underline-offset-4 hover:text-primary">
                Cadastre-se
              </a>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

