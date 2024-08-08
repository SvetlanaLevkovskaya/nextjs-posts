import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'


type CreatePostInput = {
  title: string
  body: string
  userId: number
}

export const useCreatePost = (options = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newPost: CreatePostInput) => {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      })
    },
    ...options,
  })
}
