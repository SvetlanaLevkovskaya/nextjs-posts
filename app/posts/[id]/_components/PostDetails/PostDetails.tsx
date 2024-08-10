'use client'

import { FC, ReactNode, useState } from 'react'

import Image from 'next/image'

import { Spinner } from '@/components/ui'

import { usePost } from '@/hooks/query/usePost'
import { useUser } from '@/hooks/query/useUser'
import { generateImageUrl } from '@/utils/generateImageUrl'

import styles from './PostDetails.module.scss'


type PostDetailsProps = {
  postId: number
  children?: ReactNode
}

export const PostDetails: FC<PostDetailsProps> = ({ postId }) => {
  const { data: post, isLoading: isLoadingPost, error: errorPost } = usePost({ id: postId })
  const {
    data: user,
    isLoading: isLoadingUser,
    error: errorUser,
  } = useUser({ userId: post?.userId || 0, enabled: !!post })

  const [hasImageError, setHasImageError] = useState<boolean>(false)

  if (isLoadingPost || isLoadingUser) return <Spinner />
  if (errorPost || errorUser) return <div>Error loading data</div>

  if (!post || !user) return <div>No data found</div>

  const imageUrl = generateImageUrl(postId)

  return (
    <div className={styles.postDetailsWrapper}>
      <div className={styles.titleWrapper}>
        <h1>{post.title}</h1>
        <p>Author: {user.username}</p>
      </div>
      <p>{post.body}</p>

      <div className={styles.imageWrapper}>
        {hasImageError && <div className={styles.noDataContainer}>No Data</div>}
        <Image
          src={imageUrl}
          alt={`Furniture related to post ${postId}`}
          className={styles.postImage}
          width={200}
          height={200}
          onError={() => {
            setHasImageError(true)
          }}
        />
      </div>
    </div>
  )
}
