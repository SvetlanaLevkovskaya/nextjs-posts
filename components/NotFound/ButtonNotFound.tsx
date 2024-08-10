'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/ui/Button/Button'


export const ButtonNotFound = () => {
  const { push } = useRouter()

  return (
    <Button
      color="white"
      size="l"
      className="w-full tb:w-[330px] mt-5"
      onClick={() => {
        push('/')
      }}
    >
      Go Home
    </Button>
  )
}
