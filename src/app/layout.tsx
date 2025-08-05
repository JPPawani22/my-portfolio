import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PawaniU - Portfolio",
  description: "Full Stack Developer Portfolio showcasing projects and skills",
  keywords: "developer, portfolio, web development, full stack",
}

// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="m-0 p-0">
      <body className="m-0 p-0 overflow-x-hidden">
        <main className="m-0 p-0 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
