import type React from "react"
import "./globals.css"
import { Inter, Playfair_Display } from "next/font/google"
import type { Metadata } from "next"



const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})



export const metadata: Metadata = {
  title: "FounderForge - The World's Most Exclusive Founder Network",
  description:
    "Connect with elite founders who've built $10M+ businesses. Get battle-tested execution insights with no theory, no fluff.",
    generator: "ff",
  icons: {
    icon: "/lst-one.ico",
},
}

// export const metadata: Metadata = {
//   title: "FounderForge | The World's Most Exclusive Founder Network",
//   description:
//     "Connect with elite founders who've built $10M+ businesses. Get battle-tested execution insights with no theory, no fluff.",
//   viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
//     generator: 'v0.dev'
// }


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-white text-black antialiased">{children}</body>
    </html>
  )
}
