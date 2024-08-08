import axios from 'axios'

import { customToastError } from '@/ui/CustomToast/CustomToast'

import { Post, User } from '@/types'


export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error(error.message)
      return error.message || error.response.statusText
    } else if (error.request) {
      console.error('No Response Error:', error.request.statusText)
      return error.request.statusText
    }
  } else if (error instanceof Error) {
    console.error('Unknown Error:', error.message)
    return error.message
  } else {
    console.error('Unexpected Error:', error)
    return error as string
  }
  return 'Unexpected Error'
}

const instanceAxios = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

instanceAxios.interceptors.response.use(
  (res) => res,
  (error) => {
    const errorMessage = handleApiError(error)
    return Promise.reject(new Error(errorMessage))
  }
)

interface PostsResponse {
  posts: Post[]
  totalPages: number
}

export async function getPosts(page: number): Promise<PostsResponse> {
  try {
    const response = await instanceAxios.get(`/posts?_page=${page}&_limit=20`)

    const totalCount = parseInt(response.headers['x-total-count'], 10)
    const totalPages = Math.ceil(totalCount / 20)
    return {
      posts: response.data,
      totalPages,
    }
  } catch (error) {
    customToastError('Error fetching posts')
    throw new Error(handleApiError(error))
  }
}

export async function getPost(id: number): Promise<Post> {
  try {
    const response = await instanceAxios.get(`/posts/${id}`)
    return response.data
  } catch (error) {
    customToastError('Error fetching post')
    throw new Error(handleApiError(error))
  }
}

export async function getUser(userId: number): Promise<User> {
  try {
    const response = await instanceAxios.get(`/users/${userId}`)
    return response.data
  } catch (error) {
    customToastError('Error fetching user')
    throw new Error(handleApiError(error))
  }
}
