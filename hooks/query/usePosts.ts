import { useQuery } from '@tanstack/react-query'

import { getPosts } from '@/app/services/clientApi'


type UsePostsProps = {
  page: number
  enabled?: boolean
}

export const usePosts = ({ page, enabled = true }: UsePostsProps) => {
  return useQuery({
    queryKey: ['posts', page],
    queryFn: () => getPosts(page),
    select: ({ posts, totalPages }) => ({ posts, totalPages }),
    enabled,
  })
}
