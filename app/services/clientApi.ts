import axios from 'axios'

import { Post, User } from '@/types'

interface PostsResponse {
  posts: Post[]
  totalPages: number
}

export async function getPosts(page: number | string): Promise<PostsResponse> {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=20`
  )

  const totalCount = parseInt(response.headers['x-total-count'], 10)
  const totalPages = Math.ceil(totalCount / 20)
  return {
    posts: response.data,
    totalPages,
  }
}

export async function getPost(id: number): Promise<Post> {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
  return response.data
}

export async function getUser(userId: number): Promise<User> {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
  return response.data
}
