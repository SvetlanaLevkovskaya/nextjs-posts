'use client'

import { ReactNode, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useAuth } from '@/hooks/mutations/useAuth'


export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  return <>{children}</>
}
