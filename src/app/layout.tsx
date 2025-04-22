import { Inter } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { Providers } from '@/components/providers'
import { Suspense } from 'react'
import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { headers } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IT Learning Platform',
  description: 'Eine moderne Plattform zum Lernen von IT-Konzepten',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
          }>
            {children}
            <Analytics />
            <SpeedInsights />
          </Suspense>
        </Providers>
      </body>
    </html>
  )
} 