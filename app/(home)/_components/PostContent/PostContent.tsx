'use client'

import { FC, ReactNode } from 'react'

import { useRouter } from 'next/navigation'

import { Button, Spinner } from '@/ui/index'

import { usePosts } from '@/hooks/query/usePosts'

import styles from './PostContent.module.scss'

import { PostList } from '@/app/(home)/_components'
import { CreatePostForm } from '@/app/(home)/_components/CreatePostForm/CreatePostForm'


interface PostsContentProps {
  page: number
  children?: ReactNode
}

export const PostsContent: FC<PostsContentProps> = ({ page }) => {
  const router = useRouter()
  const { data, isLoading, error } = usePosts({ page })

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading posts</div>

  const handlePageChange = (newPage: number) => {
    router.push(`/?page=${newPage}`)
  }

  return (
    <div className={styles.postContentWrapper}>
      <h1>Posts</h1>
      <PostList posts={data?.posts || []} />
      <div className={styles.btnWrapper}>
        <Button
          color="neon"
          disabled={page === 1}
          size="m"
          type="square"
          onClick={() => handlePageChange(page - 1)}
        >
          {'<'}
        </Button>
        <Button
          color="neon"
          disabled={page >= (data?.totalPages || 1)}
          size="m"
          type="square"
          onClick={() => handlePageChange(page + 1)}
        >
          {'>'}
        </Button>
      </div>

      <CreatePostForm />
    </div>
  )
}
