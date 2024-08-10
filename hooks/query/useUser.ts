import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getUser } from '@/app/services/clientApi'


type UseUserProps = {
  userId: number
  enabled?: boolean
}

export const useUser = ({ userId, enabled = true }: UseUserProps) => {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
    select: (data) => data,
    enabled: enabled && !queryClient.getQueryData(['user', userId]),
    retry: 0,
  })
}
