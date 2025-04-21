import type { ReactNode } from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "FounderForge | The World's Most Exclusive Founder Network",
//   description:
//     "Connect with elite founders who've built $10M+ businesses. Get battle-tested execution insights with no theory, no fluff.",
//   viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
//     generator: 'v0.dev'
// }
export const metadata: Metadata = {
  title: "FounderForge | The World's Most Exclusive Founder Network",
  description:
    "Connect with elite founders who've built $100M+ businesses. Get battle-tested execution insights with no theory, no fluff.",
  generator: "ff",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'