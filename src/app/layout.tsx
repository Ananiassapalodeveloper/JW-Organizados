import { Providers } from "@/contexts/providers"
import "@/styles/globals.css"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react" // Import React
import AppWrapper from "@/components/AppWrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Organizado",
  description: "Aplicação de Gestão Congregacional",
  icons: {
    icon: "/favicon.svg",
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <Providers>
          <AppWrapper>{children}</AppWrapper>
        </Providers>
      </body>
    </html>
  )
}

