import { IMAGE_BASE_URL, IMAGE_DEFAULT_PARAMS } from '@/config/constants'

export const generateImageUrl = (postId: number): string => {
  return `${IMAGE_BASE_URL}?id=${postId}&${IMAGE_DEFAULT_PARAMS}`
}
