import { ReactNode, Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Spinner } from '@/components/ui'

import AuthProvider from '@/config/auth/authProvider'
import QueryProvider from '@/config/query/query'

import './globals.css'
import '@mantine/core/styles.css'

import { theme } from '@/theme'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Posts',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <title></title>
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <Suspense fallback={<Spinner />}>
            <QueryProvider>
              <ToastContainer limit={1} />
              <AuthProvider>{children}</AuthProvider>
            </QueryProvider>
          </Suspense>
        </MantineProvider>
      </body>
    </html>
  )
}
