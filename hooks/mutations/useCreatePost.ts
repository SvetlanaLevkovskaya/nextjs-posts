import { useMutation, useQueryClient } from '@tanstack/react-query'


type CreatePostInput = {
  title: string
  body: string
  userId: number
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newPost: CreatePostInput) => {
      return { ...newPost, id: Date.now() }
    },
    onSuccess: (newPost) => {
      queryClient.setQueryData(['post', newPost.id], newPost)
    },
  })
}
