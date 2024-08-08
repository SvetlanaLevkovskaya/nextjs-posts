import type { Metadata } from 'next'

import { NavLayout } from '@/components/Layouts/NavLayout'

import { getAuth } from '@/app/config/providers/auth/getAuth'
import { PostDetails } from '@/app/posts/[id]/_components'
import { Params } from '@/types'

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return { title: `Post ${params.id}` }
}

export default function PostPage({ params }: Params) {
  const { id } = params
  const { isAuth } = getAuth()

  return (
    <NavLayout isAuth={isAuth}>{isAuth && <PostDetails postId={parseInt(String(id))} />}</NavLayout>
  )
}
