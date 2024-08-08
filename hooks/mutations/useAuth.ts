import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'

interface User {
  username: string
  password: string
}

const AUTH_USER_KEY = ['auth', 'user']

export const useAuth = () => {
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: User) => {
      // Устанавливаем куки при логине
      Cookies.set('username', username)
      Cookies.set('password', password)
      return { username, password }
    },
    onSuccess: (user) => {
      // Обновляем данные пользователя в кэше после успешного логина
      queryClient.setQueryData(AUTH_USER_KEY, user)
    },
  })

  const logoutMutation = useMutation({
    mutationFn: async () => {
      // Удаляем куки при логауте
      Cookies.remove('username')
      Cookies.remove('password')
      return { username: null, password: null }
    },
    onSuccess: () => {
      // Обновляем данные пользователя в кэше после логаута
      queryClient.setQueryData(AUTH_USER_KEY, { username: null, password: null })
    },
  })

  const userQuery = useQuery({
    queryKey: AUTH_USER_KEY,
    queryFn: async () => {
      // Получаем данные пользователя из куков
      const username = Cookies.get('username') || null
      const password = Cookies.get('password') || null

      // Если пользователя нет, возвращаем null значения
      if (!username || !password) {
        return { username: null, password: null }
      }

      // Возвращаем данные пользователя, если куки существуют
      return { username, password }
    },
    initialData: () => {
      // Проверяем куки при инициализации запроса
      const username = Cookies.get('username')
      const password = Cookies.get('password')
      return username && password ? { username, password } : { username: 'admin', password: 'admin' }
    },
  })

  return {
    user: userQuery.data,
    isAuthenticated: !!userQuery.data?.username,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
  }
}
