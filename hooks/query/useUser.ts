import { useQuery } from '@tanstack/react-query'

import { getUser } from '@/app/services/clientApi'


type UseUserProps = {
  userId: number
  enabled?: boolean
}

export const useUser = ({ userId, enabled = true }: UseUserProps) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
    select: (data) => data,
    enabled,
    retry: 1,
  })
}
