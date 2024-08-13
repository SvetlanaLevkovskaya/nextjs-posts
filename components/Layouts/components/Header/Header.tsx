import { type FC, ReactNode } from 'react'

import { Button } from '@mantine/core'
import { useRouter } from 'next/navigation'

import { customToastSuccess } from '@/ui/CustomToast/CustomToast'

import { useAuth } from '@/hooks/mutations/useAuth'

import styles from './Header.module.css'


interface HeaderProps {
  isAuth: boolean
  children?: ReactNode
}

export const Header: FC<HeaderProps> = ({ isAuth }) => {
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    customToastSuccess(`User ${user.username} logged out`)
    router.push('/login')
  }

  const handleLogoClick = () => {
    router.push('/')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.right}>
          <Button
            radius={100}
            px={36}
            size="lg"
            onClick={handleLogoClick}
            color="#191B20"
            className="transition-all2"
          >
            LOGO
          </Button>

          {isAuth && (
            <Button
              fw={400}
              fz={14}
              px={36}
              c="#0D0E12"
              radius={100}
              size="lg"
              onClick={handleLogout}
              color="purple.3"
              className="transition-all2"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
