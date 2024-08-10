import { FC, ReactNode } from 'react'

import Link from 'next/link'

import styles from './PostList.module.scss'

import { Post } from '@/types'


type PostProps = {
  posts: Post[]
  children?: ReactNode
}

export const PostList: FC<PostProps> = ({ posts }) => (
  <div className={styles.postListWrapper}>
    {posts.map((post) => (
      <div key={post.id} className={styles.postCard}>
        <Link href={`/posts/${post.id}`}>
          <h4>{post.title}</h4>
          <p>{post.body.slice(0, 200)}...</p>
        </Link>
      </div>
    ))}
  </div>
)
