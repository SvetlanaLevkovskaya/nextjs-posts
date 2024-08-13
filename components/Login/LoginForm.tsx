'use client'

import { Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import { customToastError, customToastSuccess } from '@/ui/CustomToast/CustomToast'

import { useAuth } from '@/hooks/mutations/useAuth'

import styles from './LoginForm.module.scss'

import { FormData } from '@/types'


export const LoginForm = () => {
  const { login } = useAuth()

  const form = useForm<FormData>({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (value) => (value.trim() ? null : 'Username is required'),
      password: (value) => (value.length >= 5 ? null : 'Password must be at least 5 characters'),
    },
  })

  const onSubmit = async ({ username, password }: FormData) => {
    if (username === 'admin' && password === 'admin') {
      login({ username, password })
      customToastSuccess(`User ${username} logged in`)
      setTimeout(() => {
        window.location.href = '/'
      }, 1500)
    } else {
      customToastError('Please enter admin/admin')
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            {...form.getInputProps('username')}
            placeholder="admin"
            size="lg"
            radius="md"
            autoFocus
            error={form.errors.username}
          />
          <TextInput
            {...form.getInputProps('password')}
            placeholder="admin"
            size="lg"
            radius="md"
            type="password"
            error={form.errors.password}
          />
          <Button
            radius={100}
            fw={400}
            fz={14}
            size="lg"
            type="submit"
            fullWidth
            color="neon"
            className="transition-all2"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}
