import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getPost } from '@/services/clientApi'


type UsePostProps = {
  id: number
  enabled?: boolean
}

export const usePost = ({ id, enabled = true }: UsePostProps) => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id),
    select: (data) => data,
    enabled: enabled && !queryClient.getQueryData(['post', id]),
    retry: 0,
  })
}
