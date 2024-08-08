'use client'

import { FC } from 'react'

import { usePost } from '@/hooks/query/usePost'
import { useUser } from '@/hooks/query/useUser'

import styles from './PostDetails.module.scss'
import { Spinner } from '@/components/ui'

type PostDetailsProps = {
  postId: number
}

export const PostDetails: FC<PostDetailsProps> = ({ postId }) => {
  const { data: post, isLoading: isLoadingPost, error: errorPost } = usePost({ id: postId })
  const {
    data: user,
    isLoading: isLoadingUser,
    error: errorUser,
  } = useUser({ userId: post?.userId || 0, enabled: !!post })

  if (isLoadingPost || isLoadingUser) return <Spinner />
  if (errorPost || errorUser) return <div>Error loading data</div>

  if (!post || !user) return <div>No data found</div>

  return (
    <div className={styles.postDetailsWrapper}>
      <div className={styles.titleWrapper}>
        <h1>{post.title}</h1>
        <p>Author: {user.username}</p>
      </div>
      <p>{post.body}</p>
    </div>
  )
}
