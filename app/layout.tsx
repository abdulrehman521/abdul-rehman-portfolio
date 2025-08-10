// import type { Metadata } from "next"
// import { Inter, Montserrat } from 'next/font/google'
// import "./globals.css"
// import { Navigation } from "@/components/navigation"
// import { Footer } from "@/components/footer"

// const montserrat = Montserrat({ 
//   subsets: ["latin"],
//   variable: "--font-montserrat"
// })

// export const metadata: Metadata = {
//   title: "Abdul Rehman - Filmmaker | Videographer | Photographer",
//   description: "Creative and detail-oriented Video Editor & Videographer with 5+ years' experience producing commercials, short films, documentaries, and corporate videos.",
//   keywords: "filmmaker, videographer, photographer, video editor, DaVinci Resolve, Adobe Premiere Pro",
//     generator: 'v0.dev'
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" className="dark">
//       <body className={`${montserrat.variable} font-sans bg-black text-white antialiased`}>
//         <Navigation />
//         <main>{children}</main>
//         <Footer />
//       </body>
//     </html>
//   )
// }


import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Abdul Rehman - Filmmaker | Videographer | Photographer",
  description:
    "Creative and detail-oriented Video Editor & Videographer with 5+ years' experience producing commercials, short films, documentaries, and corporate videos.",
  keywords: "filmmaker, videographer, photographer, video editor, DaVinci Resolve, Adobe Premiere Pro",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${montserrat.variable} font-sans bg-black text-white antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navigation />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
