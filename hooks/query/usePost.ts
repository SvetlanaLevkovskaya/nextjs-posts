import { useQuery } from '@tanstack/react-query'

import { getPost } from '@/app/services/clientApi'

type UsePostProps = {
  id: number
  enabled?: boolean
}

export const usePost = ({ id, enabled = true }: UsePostProps) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id),
    select: (data) => data,
    enabled,
  })
}
