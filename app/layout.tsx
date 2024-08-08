import { ReactNode, Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Spinner } from '@/components/ui'

import './globals.css'

import AuthProvider from '@/app/config/providers/auth/authProvider'
import QueryProvider from '@/app/config/providers/query/query'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Posts',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Spinner />}>
          <QueryProvider>
            <ToastContainer limit={1} />
            <AuthProvider>{children}</AuthProvider>
          </QueryProvider>
        </Suspense>
      </body>
    </html>
  )
}
