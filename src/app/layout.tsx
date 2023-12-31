'use client'
import Headers from '@/components/Headers'
import './globals.css'

import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ReduxProvider from '@/redux/Provider'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={(inter.className, 'bg-[#FAFAFA] w-full h-full')}>
        <Headers />
        <ReduxProvider>
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  )
}
