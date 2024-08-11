import { useQuery } from '@tanstack/react-query'

import { generateImageUrl } from '@/utils/generateImageUrl'


const fetchImageUrl = async (postId: number) => {
  return generateImageUrl(postId)
}

export const useImageUrl = (postId: number) => {
  return useQuery({
    queryKey: ['imageUrl', postId],
    queryFn: () => fetchImageUrl(postId),
    staleTime: 1000 * 60 * 5,
    retry: 0,
  })
}
