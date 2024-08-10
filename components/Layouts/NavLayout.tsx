'use client'

import { type FC, type PropsWithChildren, ReactNode } from 'react'

import clsx from 'clsx'

import styles from './NavLayout.module.scss'

import { Header } from './components/Header/Header'


interface NavLayoutProps extends PropsWithChildren {
  isAuth: boolean
  disabledPadding?: boolean
  children?: ReactNode
}

export const NavLayout: FC<NavLayoutProps> = ({ isAuth, disabledPadding, children }) => {
  return (
    <div className={styles.navLayout}>
      {isAuth && <Header isAuth={isAuth} />}
      <main className={clsx(styles.main, { ['p-6']: !disabledPadding })}>{children}</main>
    </div>
  )
}
