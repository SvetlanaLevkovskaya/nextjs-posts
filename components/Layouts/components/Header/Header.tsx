import { type FC, ReactNode } from 'react'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui'

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
          <Button color="grey" onClick={handleLogoClick}>
            LOGO
          </Button>
          {isAuth && (
            <Button color="purple" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
