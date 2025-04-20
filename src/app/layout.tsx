import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import ClientProvider from '@/components/ClientProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IT Learning Platform',
  description: 'Eine Plattform zum Lernen von IT-Themen',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <ClientProvider>
          <Navbar />
          <main>{children}</main>
        </ClientProvider>
      </body>
    </html>
  )
} 