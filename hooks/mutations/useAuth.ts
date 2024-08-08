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
      Cookies.set('username', username)
      Cookies.set('password', password)
      return { username, password }
    },
    onSuccess: (user) => {
      queryClient.setQueryData(AUTH_USER_KEY, user)
    },
  })

  const logoutMutation = useMutation({
    mutationFn: async () => {
      Cookies.remove('username')
      Cookies.remove('password')
      return { username: null, password: null }
    },
    onSuccess: () => {
      queryClient.setQueryData(AUTH_USER_KEY, { username: null, password: null })
    },
  })

  const userQuery = useQuery({
    queryKey: AUTH_USER_KEY,
    queryFn: async () => {
      const username = Cookies.get('username') || null
      const password = Cookies.get('password') || null

      if (!username || !password) {
        return { username: null, password: null }
      }

      return { username, password }
    },
    initialData: () => {
      const username = Cookies.get('username')
      const password = Cookies.get('password')
      return username && password
        ? { username, password }
        : { username: 'admin', password: 'admin' }
    },
  })

  return {
    user: userQuery.data,
    isAuthenticated: !!userQuery.data?.username,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
  }
}
